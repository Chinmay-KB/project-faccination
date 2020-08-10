const safeIcon = 'icons/shield.png';
const riskIcon = 'icons/caution.png';
const stopIcon = 'icons/stop.png';
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.greeting === "GetURL") {
        var tabURL = request.sentData;
        //alert(tabURL);
        var queryUrl = "http://localhost/urlstatus?url=" + tabURL;
        getData(queryUrl);
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

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            var tab = tabs[0];
            var url = tab.url;
            var queryUrl = "http://localhost/urlstatus?url=" + url;
            getData(queryUrl);
        });
        // do your things

    }
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getData(queryUrl) {
    fetch(new URL(queryUrl))
        .then(res => res.json())
        .then(data => {
            if ("error" in data) {

            } else {
                var select = data.Searchinfo.similarity * 100;
                if (select < 60) {
                    chrome.runtime.sendMessage({ greeting: "bkg_red" });
                    chrome.browserAction.setIcon({ path: stopIcon });
                }
                if (select > 60 && select <= 80) {
                    chrome.browserAction.setIcon({ path: riskIcon });
                    chrome.runtime.sendMessage({ greeting: "bkg_orange" });
                }
                if (select > 80) {
                    chrome.runtime.sendMessage({ greeting: "bkg_green" });
                    chrome.browserAction.setIcon({ path: safeIcon });
                }
            }
            // });

        });
}