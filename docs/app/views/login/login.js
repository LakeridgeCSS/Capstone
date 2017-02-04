document.addEventListener('viewChange', function (e) {
	if(e.detail == 'login'){
		let viewChanger = document.querySelector('#view-changer');
		viewChanger.addEventListener('submit', function (e) {
			console.log('ok');
			e.preventDefault();
			//authentication can be implemented here once we have a backend
			//if auth == success..
			load(routes[1]);
			//else do some error
		});
	}
});
