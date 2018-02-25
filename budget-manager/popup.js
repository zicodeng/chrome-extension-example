var total = document.getElementById('total');
var limit = document.getElementById('limit');
var amountInput = document.getElementById('amount');
var submitBtn = document.getElementById('submit');

// total is key, budget is data that associates with the key.
chrome.storage.sync.get(['total', 'limit'], function(budget) {
    total.innerText = budget.total;
    limit.innerText = budget.limit;
});

submitBtn.addEventListener('click', function(e) {
    chrome.storage.sync.get(['total', 'limit'], function(budget) {
        var newTotal = 0;
        if (budget.total) {
            // Chrome storage will serialize everything gets stored.
            newTotal = parseInt(budget.total);
        }

        var amount = amountInput.value;
        if (amount) {
            newTotal += parseInt(amount);
        }

        chrome.storage.sync.set({ total: newTotal }, function() {
            if (amount && newTotal >= budget.limit) {
                // Note: starting in Chrome 59, notifications sent via the Notifications API
                // or the chrome.notifications extensions API will be shown
                // directly by the macOS native notification system instead of Chrome's own system.
                var notifOptions = {
                    type: 'basic',
                    // The priority does not affect the order of notifications
                    // in Chrome version 59+ on Mac OS X.
                    priority: 0,
                    iconUrl: 'icon.png',
                    title: 'Budget Limit Reached',
                    message: 'Uh oh! Looks like you have reached your limit'
                };
                chrome.notifications.create('limitNotif', notifOptions);
            }
        });

        total.innerText = newTotal;
        amountInput.value = '';
    });
});
