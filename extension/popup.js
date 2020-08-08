document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
        chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
            chrome.runtime.sendMessage({ greeting: "GetURL", sentData: String(tabs[0].url) });

        });
    }, false);

}, false);