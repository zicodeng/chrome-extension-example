// Listen message sent from content.js
// Is request is matched, activate extension here.
chrome.runtime.onMessage.addListener(function(req, sender, senderRes) {
    if (req.todo === 'showPageAction') {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true
            },
            function(tabs) {
                chrome.pageAction.show(tabs[0].id);
            }
        );
    }
});
