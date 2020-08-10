document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
        chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
            chrome.runtime.sendMessage({ greeting: "GetURL", sentData: String(tabs[0].url) });

        });
    }, false);

    var changeColorButton = document.getElementById('changeColor');
    changeColorButton.addEventListener('click', function() {

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