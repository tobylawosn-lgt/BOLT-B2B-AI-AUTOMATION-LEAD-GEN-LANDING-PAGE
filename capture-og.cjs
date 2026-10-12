const puppeteer = require('puppeteer-core');

(async () => {
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });
    // Allow animations and fonts to settle
    await new Promise((resolve) => setTimeout(resolve, 2500));
    await page.screenshot({ path: 'public/og-image.png', type: 'png' });
    console.log('Successfully captured public/og-image.png');

    await browser.close();

  } catch (err) {
    console.error('Error capturing screenshot:', err);
    process.exit(1);
  }
})();
