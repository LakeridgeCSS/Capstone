document.addEventListener('DOMContentLoaded', function () {
	//add routes here
	let routes = ['login'];
	let head = document.querySelector('head');
	routes.forEach(function (e) {
		let script = document.createElement('script');
		script.setAttribute('src', 'app/views/' + e + '/' + e + '.js');
		head.appendChild(script);
	});
	//we load login as our home page
	load(routes[0]);
});

//grabs the new view and replaces stale view
function load(view) {
	let request = new XMLHttpRequest();
	request.open('GET', 'app/views/' + view + '/' + view + '.html', true);
	request.send();
	request.onreadystatechange = function () {
		if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
			document.getElementById('container').innerHTML = request.response;
			let style = document.querySelectorAll('link');
			style.forEach(function (e) {
				if (!e.getAttribute('href').includes('base.css')) {
					e.remove();
				}
			});
			style = document.createElement('link');
			style.setAttribute('rel', 'stylesheet');
			style.setAttribute('href', 'app/views/' + view + '/' + view + '.css');
			let head = document.querySelector('head');
			head.appendChild(style);
		}
	};
}