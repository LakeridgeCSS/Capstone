'use strict';
document.addEventListener('viewChange', function (e) {
	if (e.detail == 'describe') {
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
		request.onload = function () {
			behaviours.forEach(function (e, eid, array) {
				let behaviour = document.createElement('option');
				if (eid == array.length - 1) {
					behaviour.value = 'other';
					behaviour.textContent = 'Add Another Option';
				} else {
					behaviour.value = e.toLowerCase().replace(/\s+/g, '-');
					behaviour.textContent = e;
				}
				document.querySelector('.behaviour-list').appendChild(behaviour);
			});
		}

		function attach() {
			document.querySelectorAll('.behaviour-list').forEach(function (e) {
				e.addEventListener('change', function (e) {
					let selected = e.target.selectedOptions[0].value;
					if (selected == 'other' && !e.target.parentNode.querySelector('input[type=text]')) {
						let input = document.createElement('input');
						input.setAttribute('type', 'text');
						input.setAttribute('placeholder', 'Enter your other option here...');
						input.setAttribute('class', 'mod-input');
						e.target.parentNode.appendChild(input);
					} else if (selected != 'other' && e.target.parentNode.querySelector('input[type=text]')) {
						e.target.parentNode.querySelector('input[type=text]').remove();
					}
				});
			});
		} attach();

		document.querySelectorAll('.add-select').forEach(function (e) {
			e.addEventListener('click', function () {
				let selectContainer = [].slice.call(document.querySelectorAll('.select-container')).pop();
				let clone = selectContainer.cloneNode(true);
				//look at this...
				clone.querySelector('.behaviour-list').setAttribute('name',
					'behaviour-' + (parseInt(
						clone.querySelector('.behaviour-list').getAttribute('name').slice(
							clone.querySelector('.behaviour-list').getAttribute('name').indexOf('-') + 1
						)
					) + 1)
				);
				if (clone.querySelector('input')) {
					clone.querySelector('input').remove();
				}
				selectContainer.parentNode.appendChild(clone);
				//attach event listener to new thing
				attach();
			});
		});

		let currentTime = new Date();
		document.querySelectorAll('input[type=datetime-local]').forEach(function (e) {
			e.value = currentTime.getFullYear() + '-' +
				pad(currentTime.getMonth() + 1) + '-' +
				pad(currentTime.getDate() + 1) + 'T' +
				pad(currentTime.getHours()) + ':' + 
				pad(currentTime.getMinutes());
		});

		['submit', 'keydown'].forEach(function (ev) {
			document.getElementById('view-changer').addEventListener(ev, function (s) {
				if (s.keyCode == 13) {
					s.preventDefault();
					let e = s.target;
					let existing = e.parentNode.querySelectorAll('select option')
					let existingList = [];
					existing.forEach(function (e) {
						existingList.push(e.value);
					});
					if (existingList.indexOf(e.value) === -1) {
						let addOption = document.createElement('option');
						addOption.setAttribute('value', e.value);
						addOption.setAttribute('selected', 'selected');
						addOption.innerText = e.value;
						let customGroup =
							e.parentNode.querySelector('select optgroup') ||
							document.createElement('optgroup');
						if (!customGroup.hasAttribute('label')) {
							customGroup.setAttribute('label', 'Custom Additions');
						}
						customGroup.appendChild(addOption);
						e.parentNode.querySelector('select').appendChild(customGroup);
						e.parentNode.querySelector('input[type=text]').remove();
					}
					e.value = '';
				}
				if (ev != 'keydown') {
					s.preventDefault();
					document.querySelectorAll('form *[name]').forEach(function (e) {
						sessionStorage.setItem(e.name, e.value);
						location.hash = 'before';
					});
				}
			});
		});

		function pad(n) {
			return (n < 10) ? ('0' + n) : n;
		}
	}
});