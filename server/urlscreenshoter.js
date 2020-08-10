const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');


const webScreenshot = async (url,isMobile) => {
  fileName=uuidv4()
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: isMobile?1080:1920,
    height: isMobile?1920:1080,
    isMobile: isMobile,
    deviceScaleFactor: 1,
  });
  await page.goto(url,{timeout: 0});
  for(seconds=0;seconds<10;seconds++){
    await page.waitFor(1000)
    await page.screenshot({path: `\screenshot_cluster\\${fileName}_${isMobile?"mobile":"desktop"}${seconds}.png`});
  }
  await browser.close();
  return fileName
}
webScreenshot("https://www.npmjs.com/package/md5",false).then(param=>console.log(param))