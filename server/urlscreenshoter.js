const puppeteer = require('puppeteer');

const webScreenshot = async (fileName,isMobile) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: isMobile?1080:1920,
    height: isMobile?1920:1080,
    isMobile: isMobile,
    deviceScaleFactor: 1,
  });
  await page.goto('https://www.timeanddate.com/worldclock/india',{timeout: 0});
  for(seconds=0;seconds<10;seconds++){
    await page.waitFor(1000)
    await page.screenshot({path: `\screenshot_cluster\\${fileName}_${isMobile?"mobile":"desktop"}${seconds}.png`});
  }
  await browser.close();
}
webScreenshot("FileA",false)
