window.addEventListener('DOMContentLoaded', function () {
    document.querySelector('form').addEventListener('submit', function (e) {
        e.preventDefault();
    }); //prevent submit button from working for now.

    //check if radios/checkboxes are selected
    var clickables = document.querySelectorAll('label > input');
    clickables.forEach(function (e) {
        e.addEventListener('click', function () {
            clickables.forEach(function (e) {
                if (e.checked) {
                    e.parentNode.style.color = '#f1592a';
                } else {
                    e.parentNode.style.color = '#000';
                }
            });
        });
    });
    
    document.getElementById('add').addEventListener('keydown', function(e){
        if(e.keyCode == 13){
            var existing = document.querySelectorAll("#editable option"),
                existingList = [];
            existing.forEach(function(e){
                existingList.push(e.value);
            });
            if(existingList.indexOf(this.value) === -1){
                var addOption = document.createElement('option');
                addOption.setAttribute('value', this.value);
                addOption.innerText = this.value;
                document.getElementById("editable").appendChild(addOption);
            }
            this.value = '';
        }
    });
});