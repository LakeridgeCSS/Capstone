'use strict';
document.addEventListener('viewChange', function (e) {
	if(e.detail == 'login'){
		let viewChanger = document.querySelector('#view-changer');
		viewChanger.addEventListener('submit', function (e) {
			e.preventDefault();
			//authentication can be implemented here once we have a backend
			//if auth == success..
			location.hash = 'form';
			//else do some error
		});
	}
});
