const puppeteer = require('puppeteer-core');
const path = require('path');

const ARTIFACT_DIR = 'C:\\Users\\gampa\\.gemini\\antigravity-ide\\brain\\f4dc1c82-09b3-4c75-b5b0-f2bcd5554a0f';
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function run() {
  console.log('Launching Edge...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 950, deviceScaleFactor: 2 });

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

  // 1. Hero Preview
  console.log('1. Capturing Hero Section...');
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'preview_01_hero.png'),
    clip: { x: 0, y: 0, width: 1400, height: 920 }
  });

  // 2. About / Journey Preview
  console.log('2. Capturing About / Journey Section...');
  await page.evaluate(() => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  const aboutEl = await page.$('#about');
  if (aboutEl) {
    await aboutEl.screenshot({ path: path.join(ARTIFACT_DIR, 'preview_02_about.png') });
  }

  // 3. Dev Tools Preview
  console.log('3. Capturing Dev Tools Section...');
  await page.evaluate(() => {
    const el = document.querySelector('.dev-tools-cyber-showcase') || document.getElementById('skills');
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  const toolsEl = await page.$('.dev-tools-cyber-showcase');
  if (toolsEl) {
    await toolsEl.screenshot({ path: path.join(ARTIFACT_DIR, 'preview_03_dev_tools.png') });
  } else {
    const skillsEl = await page.$('#skills');
    if (skillsEl) {
      await skillsEl.screenshot({ path: path.join(ARTIFACT_DIR, 'preview_03_dev_tools.png') });
    }
  }

  // 4. Projects Showcase Preview
  console.log('4. Capturing Projects Showcase...');
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  const projectsEl = await page.$('#projects');
  if (projectsEl) {
    await projectsEl.screenshot({ path: path.join(ARTIFACT_DIR, 'preview_04_projects.png') });
  }

  // 5. Experience & Education Preview
  console.log('5. Capturing Experience Section...');
  await page.evaluate(() => {
    const el = document.getElementById('experience');
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  const expEl = await page.$('#experience');
  if (expEl) {
    await expEl.screenshot({ path: path.join(ARTIFACT_DIR, 'preview_05_experience.png') });
  }

  // 6. Terminal Preview
  console.log('6. Capturing Terminal...');
  await page.evaluate(() => {
    const el = document.getElementById('terminal') || document.querySelector('.terminal-section');
    if (el) {
      el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  const terminalEl = await page.$('.terminal-section') || await page.$('#terminal');
  if (terminalEl) {
    await terminalEl.screenshot({ path: path.join(ARTIFACT_DIR, 'preview_06_terminal.png') });
  }

  // 7. Footer Thank You Card Preview
  console.log('7. Capturing Footer...');
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(r => setTimeout(r, 1200));
  const footerEl = await page.$('.footer-container');
  if (footerEl) {
    await footerEl.screenshot({ path: path.join(ARTIFACT_DIR, 'preview_07_footer.png') });
  }

  await browser.close();
  console.log('SUCCESS: All 7 high-res preview screenshots generated!');
}

run().catch(err => {
  console.error('Fatal error capturing screenshots:', err);
  process.exit(1);
});
