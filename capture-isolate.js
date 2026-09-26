const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = path.join(__dirname);

const TARGET_FILES = [
  { module: 'M01', file: 'mockup-SCR-M01-003.html' },
  { module: 'M02', file: 'mockup-SCR-M02-001.html' },
  { module: 'M02', file: 'mockup-SCR-M02-002.html' },
  { module: 'M02', file: 'mockup-SCR-M02-003.html' },
];

const VIEWPORT = { width: 1920, height: 1080 };

(async () => {
  console.log('Starting isolated frame capture...\n');
  const browser = await chromium.launch({ headless: true });

  for (const { module, file } of TARGET_FILES) {
    const mockupsDir = path.join(BASE, 'screens', module, 'mockups');
    const outputDir  = path.join(BASE, 'screens', module, 'screen-img');
    const srcPath    = path.join(mockupsDir, file);
    const baseName   = file.replace(/\.html$/, '');

    if (!fs.existsSync(srcPath)) {
      console.warn(`[SKIP] ${file} not found`);
      continue;
    }

    console.log(`=== ${file} ===`);
    const context = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2 });
    const page    = await context.newPage();
    await page.goto(`file://${srcPath}`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.evaluate(() => document.fonts.ready);

    const frames = await page.locator('.phone-frame').all();
    console.log(`  Found ${frames.length} frame(s)`);

    for (let i = 0; i < frames.length; i++) {
      const outName = `${baseName}-state-${i + 1}.png`;
      const outPath = path.join(outputDir, outName);

      await page.evaluate((idx) => {
        document.querySelectorAll('.phone-frame').forEach((el, j) => {
          if (j === idx) {
            el.style.display = 'flex';
            el.style.margin = '40px auto';
            el.style.position = 'relative';
          } else {
            el.style.display = 'none';
          }
        });
        document.body.style.display = 'block';
      }, i);

      await page.waitForTimeout(200);
      await frames[i].screenshot({ path: outPath });
      console.log(`  [OK] ${outName}`);
    }

    await context.close();
  }

  await browser.close();
  console.log('\nAll done.');
})();
