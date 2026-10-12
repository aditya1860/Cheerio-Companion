import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('screenshots');
const ROOT_SCREENSHOT_DIR = path.resolve('..', 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}
if (!fs.existsSync(ROOT_SCREENSHOT_DIR)) {
  fs.mkdirSync(ROOT_SCREENSHOT_DIR, { recursive: true });
}

function saveToBoth(filename) {
  const src = path.join(SCREENSHOT_DIR, filename);
  const dest = path.join(ROOT_SCREENSHOT_DIR, filename);
  fs.copyFileSync(src, dest);
}

async function clickButtonWithText(page, text, timeout = 10000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const clicked = await page.evaluate((t) => {
      const btns = Array.from(document.querySelectorAll('button, [role="button"]'));
      const btn = btns.find((b) => b.innerText && b.innerText.includes(t));
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    }, text);

    if (clicked) return true;
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Timeout waiting to click button with text: "${text}"`);
}

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Templates page with Rejected badge + Guide nudge
  console.log('Navigating to /templates...');
  await page.goto('http://localhost:5173/templates', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));

  const shot1 = path.join(SCREENSHOT_DIR, '01-templates-rejected-nudge.png');
  await page.screenshot({ path: shot1, fullPage: false });
  saveToBoth('01-templates-rejected-nudge.png');
  console.log('Captured: 01-templates-rejected-nudge.png');

  // 2. Click "Fix with Guide" to open Guide panel
  console.log('Opening Guide panel via "Fix with Guide"...');
  await clickButtonWithText(page, 'Fix with Guide');

  // Wait for conversation animation and chips to appear
  console.log('Waiting for conversation and chip to appear...');
  await new Promise((r) => setTimeout(r, 3500));

  console.log('Clicking "Show me the fix"...');
  await clickButtonWithText(page, 'Show me the fix');
  await new Promise((r) => setTimeout(r, 1000));

  // Expand "Why does this fix it?"
  console.log('Expanding "Why does this fix it?" accordion...');
  try {
    await clickButtonWithText(page, 'Why does this fix it?', 3000);
    await new Promise((r) => setTimeout(r, 400));
  } catch (e) {
    console.log('Accordion note:', e.message);
  }

  const shot2 = path.join(SCREENSHOT_DIR, '02-fix-comparison-view.png');
  await page.screenshot({ path: shot2, fullPage: false });
  saveToBoth('02-fix-comparison-view.png');
  console.log('Captured: 02-fix-comparison-view.png');

  // 3. Click "Accept & Resubmit" -> wait for progress -> success screen -> schedule campaign
  console.log('Submitting fix via "Accept & Resubmit"...');
  await clickButtonWithText(page, 'Accept & Resubmit');

  console.log('Waiting for multi-step progress to finish (6s)...');
  await new Promise((r) => setTimeout(r, 7000));

  console.log('Scheduling campaign...');
  try {
    await clickButtonWithText(page, 'Schedule my Diwali campaign', 4000);
    await new Promise((r) => setTimeout(r, 800));
  } catch (e) {
    console.log('Schedule note:', e.message);
  }

  const shot3 = path.join(SCREENSHOT_DIR, '03-success-schedule-screen.png');
  await page.screenshot({ path: shot3, fullPage: false });
  saveToBoth('03-success-schedule-screen.png');
  console.log('Captured: 03-success-schedule-screen.png');

  // 4. Edge case: Open Demo Controls, trigger Low Confidence, capture with Demo Controls panel open
  console.log('Opening Demo Controls panel...');
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Toggle demo controls"]');
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 600));

  console.log('Selecting "Low Confidence" in Demo Controls...');
  await clickButtonWithText(page, 'Low Confidence');
  await new Promise((r) => setTimeout(r, 1200));

  // Ensure demo controls panel is expanded so reviewer sees both edge case in panel and the demo controls modal
  console.log('Ensuring Demo Controls panel is expanded for screenshot view...');
  await page.evaluate(() => {
    const btn = document.querySelector('button[aria-label="Toggle demo controls"]');
    if (btn && btn.getAttribute('aria-expanded') !== 'true') {
      btn.click();
    }
  });
  await new Promise((r) => setTimeout(r, 700));

  const shot4 = path.join(SCREENSHOT_DIR, '04-edge-case-demo-controls-low-confidence.png');
  await page.screenshot({ path: shot4, fullPage: false });
  saveToBoth('04-edge-case-demo-controls-low-confidence.png');
  console.log('Captured: 04-edge-case-demo-controls-low-confidence.png');

  await browser.close();
  console.log('All 4 screenshots captured successfully!');
}

run().catch((err) => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
