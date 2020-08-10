const safeIcon = 'icons/shield.png';
const riskIcon = 'icons/caution.png';
const stopIcon = 'icons/stop.png';
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.greeting === "GetURL") {
        var tabURL = request.sentData;
        //alert(tabURL);
        getData();
        let select = getRandomInt(0, 2);
        if (select == 0)
            chrome.browserAction.setIcon({ path: safeIcon });
        else if (select == 1)
            chrome.browserAction.setIcon({ path: riskIcon });
        else chrome.browserAction.setIcon({ path: stopIcon });

    } else if (request.greeting === "changeBkgCol") {
        let select = getRandomInt(0, 2);
        if (select == 0)
            chrome.runtime.sendMessage({ greeting: "bkg_red" });
        if (select == 1)
            chrome.runtime.sendMessage({ greeting: "bkg_green" });
        if (select == 2)
            chrome.runtime.sendMessage({ greeting: "bkg_orange" });

    }
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getData() {
    fetch('https://metaphysics-staging.artsy.net/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `{
                popular_artists {
                  artists {
                    name
                  }
                }
              }`
            }),
        })
        .then(res => res.json())
        .then(data => alert(data.extensions.requestID));

}

function parsemessage(res) {
    //const obj = JSON.parse(res.json());
    alert(res.status);
}