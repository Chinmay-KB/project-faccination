const puppeteer = require('puppeteer');

const webScreenshot = async (fileName) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.youtube.com/',{timeout: 0});
  for(seconds=0;seconds<10;seconds++){
    await page.waitFor(1000)
    await page.screenshot({path: `\screenshot_cluster\\${fileName}_${seconds}.png`});
  }
  await browser.close();
}
webScreenshot("FileA")
