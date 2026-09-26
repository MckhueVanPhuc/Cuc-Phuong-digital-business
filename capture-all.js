const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = path.join(__dirname);
const MODULES = [
  { name: 'M01', type: 'mobile' },
  { name: 'M02', type: 'mobile' },
  { name: 'M03', type: 'desktop' },
];

const EXPAND_CSS = `
  .phone-frame {
    height: auto !important;
    min-height: 812px !important;
    overflow: visible !important;
  }
  .phone-frame .content {
    overflow: visible !important;
    height: auto !important;
  }
`;

async function isolateAndCapture(page, frame, index, baseName, outputDir) {
  await page.evaluate((idx) => {
    document.querySelectorAll('.phone-frame').forEach((el, j) => {
      if (j === idx) {
        el.style.display = 'flex !important';
        el.style.margin = '40px auto !important';
        el.style.position = 'relative';
      } else {
        el.style.display = 'none !important';
      }
    });
    document.body.style.display = 'block';
  }, index);
  await page.waitForTimeout(200);
  const outName = `${baseName}-state-${index + 1}.png`;
  const outPath = path.join(outputDir, outName);
  await frame.screenshot({ path: outPath });
  return outName;
}

async function captureModule(moduleName, type) {
  const mockupsDir = path.join(BASE, 'screens', moduleName, 'mockups');
  const outputDir  = path.join(BASE, 'screens', moduleName, 'screen-img');

  if (!fs.existsSync(mockupsDir)) {
    console.warn(`[${moduleName}] mockups dir not found, skipping.`);
    return [];
  }
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(mockupsDir).filter(f => f.endsWith('.html')).sort();
  if (files.length === 0) {
    console.warn(`[${moduleName}] no HTML files found.`);
    return [];
  }

  const browser = await chromium.launch({ headless: true });
  const mobileViewport  = { width: 1920, height: 1080 };
  const desktopViewport = { width: 1440, height: 900 };
  const viewport = type === 'mobile' ? mobileViewport : desktopViewport;

  console.log(`\n=== ${moduleName} | ${type === 'mobile' ? 'Mobile' : 'Desktop'} ${viewport.width}x${viewport.height} ===`);
  const results = [];

  for (const file of files) {
    const srcPath  = path.join(mockupsDir, file);
    const baseName = file.replace(/\.html$/, '');

    try {
      const context = await browser.newContext({ viewport, deviceScaleFactor: 2 });
      const page    = await context.newPage();
      await page.goto(`file://${srcPath}`, { waitUntil: 'networkidle', timeout: 15000 });

      if (type === 'mobile') {
        await page.addStyleTag({ content: EXPAND_CSS });
        await page.evaluate(() => document.fonts.ready);
        const frames = await page.locator('.phone-frame').all();

        if (frames.length === 0) {
          console.warn(`  [WARN] ${baseName}: no .phone-frame found`);
        } else {
          for (let i = 0; i < frames.length; i++) {
            const name = await isolateAndCapture(page, frames[i], i, baseName, outputDir);
            console.log(`  [OK] ${name}`);
            results.push({ module: moduleName, file: baseName, frame: i + 1, name });
          }
        }
      } else {
        // Desktop: full-page screenshot
        await page.addStyleTag({ content: EXPAND_CSS });
        await page.evaluate(() => document.fonts.ready);
        const outName = `mockup-SCR-${moduleName}-${baseName.replace(`mockup-SCR-${moduleName}-`, '')}.png`;
        const outPath = path.join(outputDir, outName);
        await page.screenshot({ path: outPath, fullPage: true });
        console.log(`  [OK] ${outName}`);
        results.push({ module: moduleName, file: baseName, frame: 1, name: outName });
      }

      await context.close();
    } catch (err) {
      console.error(`  [FAIL] ${file}: ${err.message}`);
    }
  }

  await browser.close();
  return results;
}

(async () => {
  console.log('=== Unified Screenshot Capture ===\n');
  const allResults = [];
  for (const mod of MODULES) {
    const results = await captureModule(mod.name, mod.type);
    allResults.push(...results);
  }

  console.log('\n=== SUMMARY ===');
  for (const mod of MODULES) {
    const modResults = allResults.filter(r => r.module === mod.name);
    console.log(`\n[${mod.name}] (${modResults.length} files)`);
    modResults.forEach(r => console.log(`  ${r.name}`));
  }
  console.log(`\nTotal: ${allResults.length} PNG files`);
})();
