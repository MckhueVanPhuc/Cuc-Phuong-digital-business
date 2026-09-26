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

/**
 * Map each DOM .phone-frame to its language by counting source frames
 * per section, then assigning overflow (JS-generated) frames to the last lang.
 */
async function detectFrameLangs(page, frames, filePath) {
  const html = fs.readFileSync(filePath, 'utf8');

  // Find all section-comment boundaries in source
  const sectionRe = /<!-- ===== (VI|EN)[^=]*===== -->/gi;
  const boundaries = []; // [{lang, pos}]
  let m;
  while ((m = sectionRe.exec(html)) !== null) {
    boundaries.push({ lang: m[1].toLowerCase(), pos: sectionRe.lastIndex });
  }

  // Count source frames per section
  const frameRe = /<div class="phone-frame">/g;
  const sourceGroups = []; // [{lang, count}]
  for (let i = 0; i < boundaries.length; i++) {
    const start = boundaries[i].pos;
    const end   = i + 1 < boundaries.length ? boundaries[i + 1].pos : html.length;
    const count = (html.slice(start, end).match(frameRe) || []).length;
    if (count > 0) sourceGroups.push({ lang: boundaries[i].lang, count });
  }

  // Build flat lang array: one entry per DOM frame
  const langs = [];
  for (const group of sourceGroups) {
    for (let i = 0; i < group.count; i++) langs.push(group.lang);
  }

  // If DOM has more frames than source (JS-generated frames),
  // assign overflow to the last known language
  const lastLang = langs.length > 0 ? langs[langs.length - 1] : 'vi';
  while (langs.length < frames.length) langs.push(lastLang);

  return langs;
}

/**
 * From the ordered groups, derive output filenames like:
 *   M01-001-vi-01, M01-001-vi-02, M01-001-en-01, ...
 * If only one lang present: M01-001-01, M01-001-02, ...
 */
function buildFilenames(baseName, groups) {
  if (groups.length === 0) return [{ name: `${baseName}.png`, lang: null }];

  const langs = [...new Set(groups.map(g => g.lang))];
  // Always include language suffix for consistency, even with a single language
  const useLangSuffix = true;

  const counters = {};
  langs.forEach(l => (counters[l] = 0));

  return groups.map(g => {
    counters[g.lang]++;
    const name = `${baseName}-${g.lang}-${String(counters[g.lang]).padStart(2, '0')}`;
    return { name: `${name}.png`, lang: g.lang };
  });
}

async function captureModule(moduleName, type) {
  const mockupsDir = path.join(BASE, 'screens', moduleName, 'mockups');
  const outputDir  = path.join(BASE, 'screens', moduleName, 'screen-img');

  if (!fs.existsSync(mockupsDir)) {
    console.warn(`[${moduleName}] mockups dir not found, skipping.`);
    return;
  }
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(mockupsDir).filter(f => f.endsWith('.html')).sort();
  if (files.length === 0) {
    console.warn(`[${moduleName}] no HTML files found.`);
    return;
  }

  const browser = await chromium.launch({ headless: true });

  const mobileViewport   = { width: 1920, height: 1080 };
  const desktopViewport  = { width: 1920, height: 1080 };
  const viewport = type === 'mobile' ? mobileViewport : desktopViewport;

  console.log(`\n=== ${moduleName} | ${type === 'mobile' ? 'Mobile' : 'Desktop'} ${viewport.width}x${viewport.height} ===`);

  for (const file of files) {
    const srcPath  = path.join(mockupsDir, file);
    const baseName = file.replace(/\.html$/, '');

    try {
      const context = await browser.newContext({ viewport, deviceScaleFactor: 2 });
      const page    = await context.newPage();
      await page.goto(`file://${srcPath}`, { waitUntil: 'networkidle', timeout: 15000 });

      if (type === 'mobile') {
        // ── Step 2: expand frames before screenshot ─────────────────────────
        await page.addStyleTag({ content: EXPAND_CSS });
        await page.evaluate(() => document.fonts.ready);

        const frames = await page.locator('.phone-frame').all();
        const totalFrames = frames.length;

        if (totalFrames === 0) {
          const outPath = path.join(outputDir, `${baseName}.png`);
          await page.screenshot({ path: outPath });
          console.log(`  [OK] ${baseName}.png  (full-page fallback)`);
        } else {
          // Detect language for each DOM frame via sibling comment traversal
          const langs = await detectFrameLangs(page, frames, srcPath);
          const filespecs = buildFilenames(baseName, langs.map(l => ({ lang: l })));

          for (let i = 0; i < totalFrames; i++) {
            const outName = `${baseName}-state-${String(i + 1)}.png`;
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
        }
      } else {
        // ── Desktop: full-page screenshot ────────────────────────────────────
        await page.addStyleTag({ content: EXPAND_CSS });
        await page.evaluate(() => document.fonts.ready);
        const outPath = path.join(outputDir, `${baseName}.png`);
        await page.screenshot({ path: outPath, fullPage: true });
        console.log(`  [OK] ${baseName}.png`);
      }

      await context.close();
    } catch (err) {
      console.error(`  [FAIL] ${file}: ${err.message}`);
    }
  }

  await browser.close();
}

(async () => {
  console.log('Starting screenshot capture...\n');
  for (const mod of MODULES) {
    await captureModule(mod.name, mod.type);
  }
  console.log('\nAll done.');
})();
