'use strict';
document.addEventListener('viewChange', function(e){
	if(e.detail == 'type'){
		var viewChanger = document.querySelector('#view-changer');
		viewChanger.addEventListener('submit', function(e){
			e.preventDefault();
			location.hash = 'describe';
		});
	}
});