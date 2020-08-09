const tldjs = require('tldjs');

const urlparser = (url)=>{
    domain=tldjs.parse(url).domain
    hostname=tldjs.parse(url).hostname
    if(!domain)
    {
        console.log("Malformed URL")
    }
    else{
        console.log(`You are visiting the webpage: ${hostname} hosted at ${domain}`)
    }
    if(tldjs.parse(url).isIp){
        console.log(`You are visiting an IP Address directly instead of a domain`)
    }
}
urlparser("192.168.1.0")