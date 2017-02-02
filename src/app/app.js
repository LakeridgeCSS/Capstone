document.addEventListener('DOMContentLoaded', function () {
	let routes = ['login'];
	let head = document.querySelector('head');
	routes.forEach(function (e) {
		let script = document.createElement('script');
		script.setAttribute('src', 'app/views/' + e + '/' + e + '.js');
		head.appendChild(script);
	});
});