var nameInput = document.getElementById('input-name');
var nameContainer = document.getElementById('name');

nameInput.addEventListener('input', function() {
    nameContainer.innerText = nameInput.value;
});
