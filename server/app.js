const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');
const {getMetadata} = require('page-metadata-parser');
const domino = require('domino');
const fetch = require("node-fetch");
var stringSimilarity = require('string-similarity');
const tldjs = require('tldjs');
require('dotenv').config()
const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');

const app = express();


// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


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
    for(seconds=0;seconds<5;seconds++){
      await page.waitFor(1000)
      await page.screenshot({path: `\screenshot_cluster\\${fileName}_${isMobile?"mobile":"desktop"}${seconds}.png`});
    }
    await browser.close();
    return fileName
  }


const searchURLbyDomain = async(url) => {
    const response = await fetch(url).catch(err=>console.log(err));;
    const html = await response.text().catch(err=>console.log(err));;
    const doc = domino.createWindow(html).document;
    const metadata = getMetadata(doc, url);
    console.log(metadata)
    fetchedURL=await fetch(`https://authhack.cognitiveservices.azure.com/bing/v7.0/entities?mkt=en-US&q=${tldjs.parse(metadata.url).hostname}`, { headers: { 'Ocp-Apim-Subscription-Key': process.env.OcpApimSubscriptionKey } })
    .then(res => res.json())
    .then(json => {
        let obj=new Object();
        obj.url=json.entities.value[0].url?json.entities.value[0].url:undefined
        obj.description=json.entities.value[0].description?json.entities.value[0].description:undefined
        return obj
    })
    .catch(err=>console.log(err));
    var similarity = stringSimilarity.compareTwoStrings(tldjs.parse(fetchedURL.url).hostname, tldjs.parse(metadata.url).hostname);
    let obj=new Object();
    obj.similarity=similarity
    obj.description=fetchedURL.description
    return obj
}
app.use(express.static('./screenshot_cluster')); //Serves resources from public folder
app.get('/urlstatus',(req,res)=>{
    let obj=new Object();
    if(tldjs.parse(req.query.ur).isIp){
        obj.isIP=true
        res.send(obj)
        return
    }
    hostname=tldjs.parse(req.query.url).hostname
    searchURLbyDomain(`http://${hostname}`).then(param=>{
        obj.Searchinfo=param
        obj.info=tldjs.parse(req.query.url)
        res.send(obj)})
        .catch(param=>{
            obj.error="Errored"
            res.send(obj)});
})
app.get('/urlpic',(req,res)=>{
    let obj=new Object();
    url=req.query.url
    webScreenshot(url,false).then(param=>{
        obj.filename=param
        res.send(obj)})
        .catch(param=>{
            obj.error="Errored"
            res.send(obj)});
})

app.listen(5000, () => {
    console.log('now listening for requests on port 5000');
});
