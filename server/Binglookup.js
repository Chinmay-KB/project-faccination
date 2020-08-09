const fetch = require('node-fetch');
require('dotenv').config()


fetch('https://authhack.cognitiveservices.azure.com/bing/v7.0/entities?mkt=en-US&q=apple.com',
{ headers: { 'Ocp-Apim-Subscription-Key': process.env.OcpApimSubscriptionKey } })
    .then(res => res.json())
    .then(json => console.log(json.entities.value[0].description));
