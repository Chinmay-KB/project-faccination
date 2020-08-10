const {getMetadata} = require('page-metadata-parser');
const domino = require('domino');
const fetch = require("node-fetch");
var stringSimilarity = require('string-similarity');
const tldjs = require('tldjs');
require('dotenv').config()


const searchURLbyDomain = async(url) => {
    const response = await fetch(url).catch(err=>console.log(err));;
    const html = await response.text().catch(err=>console.log(err));;
    const doc = domino.createWindow(html).document;
    const metadata = getMetadata(doc, url);
    console.log(metadata)
    fetchedURL=await fetch(`https://authhack.cognitiveservices.azure.com/bing/v7.0/entities?mkt=en-US&q=${tldjs.parse(metadata.url).hostname}`, { headers: { 'Ocp-Apim-Subscription-Key': process.env.OcpApimSubscriptionKey } })
    .then(res => res.json())
    .then(json => {
        return json.entities.value[0].url?json.entities.value[0].url:undefined
    })
    .catch(err=>console.log(err));
    var similarity = stringSimilarity.compareTwoStrings(fetchedURL, metadata.url);
    return similarity
}

const visionAPI = async (fileURL) => {
    const url = 'mail.google.com';
    const response = await fetch(url).catch(()=>console.log("Fetch Error"));
    const html = await response.text();
    const doc = domino.createWindow(html).document;
    const metadata = getMetadata(doc, url);
    //console.log(metadata)
}
//visionAPI('./screenshot_cluster/Screenshot (2211).png')
//export searchURLbyDomain('http://www.nitkl.in')
