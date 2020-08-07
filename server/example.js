const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://github.com/Chinmay-KB/project-faccination');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();