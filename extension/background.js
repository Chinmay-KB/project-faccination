chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.greeting === "GetURL") {
        var tabURL = request.sentData;
        alert(tabURL);
    }
})