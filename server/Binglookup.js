const fetch = require('node-fetch');
require('dotenv').config()

isDuplicateURL=null

const Lookup = async (url) => {
    fetch('https://authhack.cognitiveservices.azure.com/bing/v7.0/entities?mkt=en-US&q=google.co',
    { headers: { 'Ocp-Apim-Subscription-Key': process.env.OcpApimSubscriptionKey } })
    .then(res => res.json())
    .then(json => {
        if(typeof(json.queryContext.alteredQuery)!=='undefined')
        {
            isDuplicateURL=json.queryContext.alteredQuery
        }

    });

}