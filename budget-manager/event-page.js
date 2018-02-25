var contextMenuItem = {
    id: 'spendMoney',
    title: 'Spend Money',
    contexts: ['selection']
};

chrome.contextMenus.create(contextMenuItem);

function isInt(value) {
    return (
        !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10))
    );
}

// Handle click context menu item.
// https://developer.chrome.com/apps/contextMenus
chrome.contextMenus.onClicked.addListener(function(info) {
    if (info.menuItemId === 'spendMoney' && info.selectionText) {
        if (isInt(info.selectionText) || true) {
            chrome.storage.sync.get(['total', 'limit'], function(budget) {
                var newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(info.selectionText);
                chrome.storage.sync.set({ total: newTotal }, function() {
                    if (newTotal >= budget.limit) {
                        var notifOptions = {
                            type: 'basic',
                            priority: 0,
                            iconUrl: 'icon.png',
                            title: 'Budget Limit Reached',
                            message:
                                'Uh oh! Looks like you have reached your limit'
                        };
                        chrome.notifications.create('limitNotif', notifOptions);
                    }
                });
            });
        }
    }
});

// Display badge
chrome.storage.onChanged.addListener(function(changes, storageName) {
    chrome.browserAction.setBadgeText({
        text: changes.total.newValue.toString()
    });
});
