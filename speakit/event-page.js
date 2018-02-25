var menuItem = {
    id: 'speakit',
    title: 'Speakit',
    contexts: ['selection']
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function(info) {
    if (info.menuItemId === 'speakit' && info.selectionText) {
        chrome.tts.speak(info.selectionText, { rate: 0.7 });
    }
});
