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

    document.querySelectorAll('.add').forEach(function (e) {
        e.addEventListener('keydown', function (k) {
            if (k.keyCode == 13) {
                var existing = e.parentNode.querySelectorAll('.editable'),
                    existingList = [];
                existing.forEach(function (e) {
                    existingList.push(e.value);
                });
                if (existingList.indexOf(this.value) === -1) {
                    var addOption = document.createElement('option');
                    addOption.setAttribute('value', this.value);
                    addOption.innerText = this.value;
                    e.parentNode.querySelector('.editable').appendChild(addOption);
                }
                this.value = "";
            }
        })
    });

    document.querySelectorAll('.timer button').forEach(function (e) {
        e.addEventListener('click', function () {
            if (this.innerHTML == 'Start' || this.innerHTML == 'Restart') {
                var now = Date.now(),
                    minutes = 0,
                    hours = 0;
                go = setInterval(function () { //unscoped for a reason
                    if (minutes > 59) {
                        hours++;
                        minutes = 0;
                    }
                    if (parseFloat(e.parentNode.querySelector('.seconds').innerHTML) > 59) {
                        minutes++;
                        now = Date.now();
                    }
                    e.parentNode.querySelector('.hours-minutes').innerText = pad(hours) + ":" + pad(minutes) + ":";
                    e.parentNode.querySelector('.seconds').innerText = ((Date.now() - now) / 1000).toFixed(3);
                }, 1);
                this.innerHTML = "Stop";
            } else {
                clearInterval(go);
                this.innerHTML = "Restart";
                this.parentNode.querySelector(".time-value").value = e.parentNode.querySelector('.hours-minutes').innerText + e.parentNode.querySelector('.seconds').innerText;
            }
        });
    });
});

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}