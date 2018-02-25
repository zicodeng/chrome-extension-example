var colorInput = document.getElementById('font-color');
var color = colorInput.value;
var changeBtn = document.getElementById('change');

colorInput.addEventListener('change', function() {
    color = this.value;
});

changeBtn.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // popup gathers user input, and sends the input value to content.js
        // to actually apply change on page.
        chrome.tabs.sendMessage(tabs[0].id, {
            todo: 'changeColor',
            color: color
        });
    });
});
