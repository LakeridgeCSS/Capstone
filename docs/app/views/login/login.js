'use strict';
document.addEventListener('viewChange', function (e) {
	if(e.detail == 'login'){
		var viewChanger = document.querySelector('#view-changer');
		viewChanger.addEventListener('submit', function (e) {
			e.preventDefault();
			//authentication can be implemented here once we have a backend
			//if auth == success...
			sessionStorage.clear();
			location.hash = 'describe';
			//else do some error
		});
	}
});
