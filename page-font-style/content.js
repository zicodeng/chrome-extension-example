// If the user is on a any particular pages we have specified in manifest.json,
// content.js will be injected into the page,
// the function below will be fired and send a message to runtime.
// Then in our event-page.js, we can listen to this message,
// and decide whether to activate our extension or not.
chrome.runtime.sendMessage({ todo: 'showPageAction' });

// Listen message sent from popup.js
chrome.runtime.onMessage.addListener(function(req, sender, senderRes) {
    if (req.todo === 'changeColor') {
        var color = '#' + req.color;
        // content scripts will have access to DOM.
        var page = document.getElementById('intro');
        page.style.color = color;
    }
});
