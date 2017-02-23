'use strict';
document.addEventListener('viewChange', function(e){
	var forms = ['describe', 'before', 'after'];
	if(forms.indexOf(e.detail) != -1){
		var causes;
		var subsequentList = document.getElementById('causes-list');
		var request = new XMLHttpRequest();
		request.open('GET', 'app/views/' + e.detail + '/assets/causes.json', true);
		request.send();
		request.onreadystatechange = function () {
			if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
				causes = JSON.parse(request.responseText);
			}
		};
		request.onload = function () {
			causes.forEach(function (e, eid, array) {
				var subsequent = document.createElement('option');
				if (eid == array.length - 1) {
					subsequent.value = 'other';
					subsequent.textContent = 'Add Another Option';
				} else {
					subsequent.value = e.toLowerCase().replace(/\s+/g, '-');
					subsequent.textContent = e;
				}
				document.querySelector('.causes-list').appendChild(subsequent);
			});
		}
	}

	function attach() {
		var list = document.querySelectorAll('.causes-list');
		Object.keys(list).forEach(function (l) {
			list[l].addEventListener('change', function (e) {
				var selected = e.target.selectedOptions[0].value;
				if (selected == 'other' && !e.target.parentNode.querySelector('input[type=text]')) {
					var input = document.createElement('input');
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

	var selection = document.querySelectorAll('.add-select');
	Object.keys(selection).forEach(function (e) {
		selection[e].addEventListener('click', function () {
			var selectContainer = [].slice.call(document.querySelectorAll('.select-container')).pop();
			var clone = selectContainer.cloneNode(true);
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

	['submit', 'keydown'].forEach(function (ev) {
		document.getElementById('view-changer').addEventListener(ev, function (s) {
			if (s.keyCode == 13) {
				s.preventDefault();
				var e = s.target;
				var existing = e.parentNode.querySelectorAll('select option')
				var existingList = [];
				Object.keys(existing).forEach(function (e) {
					existingList.push(existing[e].value);
				});
				if (existingList.indexOf(e.value) === -1) {
					var addOption = document.createElement('option');
					addOption.setAttribute('value', e.value);
					addOption.setAttribute('selected', 'selected');
					addOption.innerText = e.value;
					var customGroup =
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
				var named = document.querySelectorAll('form *[name]');
				var dataSave = new Event('dataSave');
				Object.keys(named).forEach(function (e) {
					sessionStorage.setItem(named[e].name, named[e].value);
				}, document.dispatchEvent(dataSave));
			}
		});
	});
});
