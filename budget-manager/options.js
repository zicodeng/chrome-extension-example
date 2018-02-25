var limitInput = document.getElementById('limit');
var saveBtn = document.getElementById('save');
var resetBtn = document.getElementById('reset');

chrome.storage.sync.get('limit', function(budget) {
    limitInput.value = budget.limit;
});

saveBtn.addEventListener('click', function() {
    var limit = parseInt(limitInput.value);
    if (limit) {
        chrome.storage.sync.set({ limit }, function() {
            // Close the current tab.
            close();
        });
    }
});

resetBtn.addEventListener('click', function() {
    chrome.storage.sync.set({ total: 0 }, function() {
        var notifOptions = {
            type: 'basic',
            priority: 0,
            iconUrl: 'icon.png',
            title: 'Total Reset',
            message: 'Total spending has been reset to 0'
        };
        chrome.notifications.create('totalResetNotif', notifOptions);
    });
});
