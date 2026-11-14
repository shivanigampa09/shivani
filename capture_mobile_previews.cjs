const puppeteer = require('puppeteer-core');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\gampa\\.gemini\\antigravity-ide\\brain\\f4dc1c82-09b3-4c75-b5b0-f2bcd5554a0f';
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function run() {
  console.log('Launching Edge for Mobile Viewport...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  // Standard modern mobile viewport: 393 x 852 (iPhone 14/15 Pro)
  await page.setViewport({
    width: 393,
    height: 852,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  console.log('Navigating to local portfolio...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

  // Dismiss intro by clicking it
  console.log('Dismissing intro...');
  const overlay = await page.$('.hello-intro-overlay');
  if (overlay) {
    await overlay.click();
    await new Promise(r => setTimeout(r, 2200));
  }

  // Force reveal all scroll elements
  await page.evaluate(() => {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-revealed'));
    window.scrollTo(0, 0);
  });
  await new Promise(r => setTimeout(r, 1000));

  // 1. Mobile Hero Top
  console.log('1. Capturing Mobile Hero Top Fold...');
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'mobile_01_hero.png'),
    clip: { x: 0, y: 0, width: 393, height: 852 }
  });

  // 2. Mobile About / Journey Section (Front of Shivani Gampa Card)
  console.log('2. Capturing Mobile About / Journey Section (Front Card)...');
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 85;
      window.scrollTo({ top: y, behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 800));
  const aboutEl = await page.$('#about');
  if (aboutEl) {
    await aboutEl.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_02_about.png') });
  }

  // 2b. Mobile Flip Card Clicked / Flipped to reveal the 4 capabilities
  console.log('2b. Clicking Shivani Gampa card to flip and capture back face...');
  const flipTrigger = await page.$('#journey-profile-flip-card');
  if (flipTrigger) {
    await flipTrigger.click();
    await new Promise(r => setTimeout(r, 900));
    await aboutEl.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_02b_about_flipped.png') });
  }

  // 3. Mobile Dev Tools Section (Small compact cards)
  console.log('3. Capturing Mobile Dev Tools Section...');
  await page.evaluate(() => {
    const el = document.getElementById('skills');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 85;
      window.scrollTo({ top: y, behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 800));
  const skillsEl = await page.$('#skills');
  if (skillsEl) {
    await skillsEl.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_03_dev_tools.png') });
  }

  // 4. Mobile Projects Showcase (2-column grid and Mihika Ayra export ship)
  console.log('4. Capturing Mobile Projects Showcase...');
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 85;
      window.scrollTo({ top: y, behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 800));
  const projectsEl = await page.$('#projects');
  if (projectsEl) {
    await projectsEl.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_04_projects.png') });
  }

  // 5. Mobile Experience Section (Education Closed by default)
  console.log('5. Capturing Mobile Experience Section (Education Closed)...');
  await page.evaluate(() => {
    const el = document.getElementById('experience');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 85;
      window.scrollTo({ top: y, behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 800));
  const expEl = await page.$('#experience');
  if (expEl) {
    await expEl.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_05_experience_closed.png') });
  }

  // 5b. Open Education Details on 1-Click
  console.log('5b. Clicking Education 1-Click Accordion to Open...');
  const eduToggle = await page.$('#education-toggle-header');
  if (eduToggle) {
    await eduToggle.click();
    await new Promise(r => setTimeout(r, 800));
    await expEl.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_05b_experience_opened.png') });
  }

  // 6. Mobile Touch Cursor Interaction
  console.log('6. Simulating Mobile Touch to test touch cursor follower...');
  await page.touchscreen.tap(200, 400);
  await new Promise(r => setTimeout(r, 100));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'mobile_06_touch_cursor.png'),
    clip: { x: 50, y: 300, width: 300, height: 300 }
  });

  // 7. Mobile Footer
  console.log('7. Capturing Mobile Footer...');
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(r => setTimeout(r, 800));
  const footerEl = await page.$('.footer-container');
  if (footerEl) {
    await footerEl.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_07_footer.png') });
  }

  await browser.close();
  console.log('SUCCESS: All mobile screenshots captured successfully!');
}

run().catch(err => {
  console.error('Fatal error capturing mobile screenshots:', err);
  process.exit(1);
});
