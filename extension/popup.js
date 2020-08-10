document.addEventListener('DOMContentLoaded', function() {
    // s

    var changeColorButton = document.getElementById('changeColor');
    changeColorButton.addEventListener('click', function() {
        chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
            chrome.runtime.sendMessage({ greeting: "GetURL", sentData: String(tabs[0].url) });

        });
        chrome.runtime.sendMessage({ greeting: "changeBkgCol" });
    });

}, false);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var statusBox = document.getElementById('topContainer');
    if (request.greeting === "bkg_red")
        statusBox.style.background = "#ff5252";
    if (request.greeting === "bkg_green")
        statusBox.style.background = "#26a69a"
    if (request.greeting === "bkg_orange") statusBox.style.background = "#ff9100"


});

chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
    //chrome.runtime.sendMessage({ greeting: "GetURL", sentData: String(tabs[0].url) });
    var queryUrl = "http://localhost/urlstatus?url=" + String(tabs[0].url);

    getData(queryUrl);

});

function getData(queryUrl) {
    fetch(new URL(queryUrl))
        .then(res => res.json())
        .then(data => {
            if ("error" in data) {

            } else {
                var statusBox = document.getElementById('topContainer');
                var securityScore = document.getElementById('score');
                var domainName = document.getElementById('domainName');
                var domainDetails = document.getElementById('domainDetails');
                var select = data.Searchinfo.similarity * 100;

                securityScore.innerHTML = "Score-" + select;
                domainName.innerHTML = data.info.domain;
                domainDetails.innerHTML = data.Searchinfo.description;

                if (select < 60) {
                    statusBox.style.background = "#ff5252";

                }
                if (select > 60 && select <= 80) {
                    statusBox.style.background = "#ff9100";
                }
                if (select > 80) {
                    statusBox.style.background = "#26a69a";
                }
            }
            // });

        });
}