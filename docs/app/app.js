document.addEventListener('DOMContentLoaded', function () {
	//add routes here
	routes = ['login', 'form']; //routes are global so views can change the view
	routes.forEach(function (e) {
		let script = document.createElement('script');
		script.setAttribute('src', 'app/views/' + e + '/' + e + '.js');
		document.head.appendChild(script);
	});

	//we must wait for all view listeners to be present
	window.addEventListener('load', function () {
		//url logic
		let loc = location.href;
		let i = 0;
		if(loc.indexOf('#') != -1){
			loc = loc.slice(loc.indexOf('#') + 1);
			if (routes.indexOf(loc) != -1) {
				i = routes.indexOf(loc);
				//no need to rewrite the url in this case
				noRewrite = true;
			}
		}
		load(routes[i]);
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
			style.forEach(function (e) {
				if (!e.getAttribute('href').includes('base.css')) {
					//can't do view conditional css; so it's removed
					e.remove();
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
	if(!noRewrite){
		location.href += '#' + e.detail;
	}	
});