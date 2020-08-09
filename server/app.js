const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const {getMetadata} = require('page-metadata-parser');
const domino = require('domino');
const fetch = require("node-fetch");
var stringSimilarity = require('string-similarity');
const tldjs = require('tldjs');
require('dotenv').config()

const app = express();

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


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
app.use(express.static('./screenshot_cluster')); //Serves resources from public folder
app.get('/urlstatus',(req,res)=>{
    searchURLbyDomain(req.query.url).then(param=>res.send(`Got GET with similarity ${param}`))
})

app.listen(80, () => {
    console.log('now listening for requests on port 80');
});
