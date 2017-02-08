document.addEventListener('DOMContentLoaded', function () {
	//add routes here
	routes = ['login', 'form']; //routes are global so views can change the view
	routes.forEach(function (e) {
		let script = document.createElement('script');
		script.setAttribute('src', 'app/views/' + e + '/' + e + '.js');
		document.head.appendChild(script);
	});

	//wait for all view listeners to be present before loading the default view
	window.addEventListener('load', function () {
		load(routes[0]);
	});	
});

//grabs the new view and replaces stale view
//this is the actual router
function load(view) {
	let request = new XMLHttpRequest();
	request.open('GET', 'app/views/' + view + '/' + view + '.html', true);
	request.send();
	request.onreadystatechange = function () {
		if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
			document.getElementById('container').innerHTML = request.response;
			let style = document.querySelectorAll('link');
			Object.keys(style).forEach(function (e) {
				if (!style[e].getAttribute('href').includes('base.css')) {
					//can't do view conditional css; so it's removed
					style[e].remove();
				}
			});
			style = document.createElement('link');
			style.setAttribute('rel', 'stylesheet');
			style.setAttribute('href', 'app/views/' + view + '/' + view + '.css');
			document.head.appendChild(style);
		}
	};

	//wait for the request to load before firing the event
	request.onload = function(){
		let viewChange = new CustomEvent('viewChange', { 'detail': view });
		document.dispatchEvent(viewChange);
	};
}

//url rewrite on view change
document.addEventListener('viewChange', function (e) {
	//rewrite logic removed for now
	location.hash = e.detail;
});

window.addEventListener('hashchange', function(){
	if (this.location.hash.indexOf('#') != -1){
		let entry = this.location.hash.slice(this.location.hash.indexOf('#') + 1);
		if (routes.indexOf(entry) != -1){
			let index = routes.indexOf(entry);
			load(routes[index]);
		}
	}
});