'use strict';
document.addEventListener('viewChange', function (e) {
	if(e.detail == 'form'){
		let behaviours;
		let behaviourList = document.getElementById('behaviour-list');
		let request = new XMLHttpRequest();
		request.open('GET', 'app/views/' + e.detail + '/assets/behaviours.json', true);
		request.send();
		request.onreadystatechange = function () {
			if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
				behaviours = JSON.parse(request.responseText);
			}
		};
		request.onload = function() {
			behaviours.forEach(function(e, eid, array){
				let behaviour = document.createElement('option');
				if (eid == array.length - 1) {
					behaviour.value = 'other';
					behaviour.textContent = 'Other';
				} else {
					behaviour.value = e.toLowerCase().replace(/\s+/g, '-');
					behaviour.textContent = e;
				}
				behaviourList.appendChild(behaviour);
			});
		}

		behaviourList.addEventListener('change', function(e){
			let selected = e.target.selectedOptions[0].value;
			if(selected == 'other' && !e.target.parentNode.querySelector('input[type=text]')){
				let input = document.createElement('input');
				input.setAttribute('type','text');
				input.setAttribute('placeholder', 'Enter your other option here...');
				input.setAttribute('class', 'mod-input');
				e.target.parentNode.appendChild(input);
			} else if (selected != 'other' && e.target.parentNode.querySelector('input[type=text]')){
				e.target.parentNode.querySelector('input[type=text]').remove();
			}
			document.querySelectorAll('.mod-input').forEach(function (e) {
				e.addEventListener('keydown', function (k) {
					if (k.keyCode == 13) {
						let existing = e.parentNode.querySelectorAll('select option')
						let existingList = [];
						existing.forEach(function (e) {
							existingList.push(e.value);
						});
						if (existingList.indexOf(this.value) === -1) {
							let addOption = document.createElement('option');
							addOption.setAttribute('value', this.value);
							addOption.setAttribute('selected', 'selected');
							addOption.innerText = this.value;
							let customGroup = 
								e.parentNode.querySelector('select optgroup') || 
								document.createElement('optgroup');
							if(!customGroup.hasAttribute('label')){
								customGroup.setAttribute('label', 'Custom Additions');
							}
							customGroup.appendChild(addOption);
							e.parentNode.querySelector('select').appendChild(customGroup);
							e.parentNode.querySelector('input[type=text]').remove();
						}
						this.value = '';
					}
				})
			});
		});

		let currentTime = new Date();
		document.querySelectorAll('input[type=time]').forEach(function(e){
			e.value = pad(currentTime.getHours()) + ':' + pad(currentTime.getMinutes());
		});

		document.getElementById('view-changer').addEventListener('submit', function (e) {
			e.preventDefault();
			let names = ['behaviour', 'intensity', 'time'];
			let form = {};
			names.forEach(function(n){
				document.getElementsByName(n).forEach(function(el){
					if ((el.type == 'radio' && el.checked) || el.type != 'radio' ){
						form[n] = el.value;
					}
				});
			});
			console.log(form);
		});

		function pad(n) {
			return (n < 10) ? ('0' + n) : n;
		}
	}
});

