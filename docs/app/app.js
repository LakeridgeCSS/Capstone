'use strict';
document.addEventListener('DOMContentLoaded', function () {
	//add routes here
	var routes = ['login', 'type', 'describe', 'before', 'after'];
	routes.forEach(function (e) {
		var script = document.createElement('script');
		script.setAttribute('src', 'app/views/' + e + '/' + e + '.js');
		script.setAttribute('defer', 'true');
		document.head.appendChild(script);
	});

	//wait for all routes
	['load', 'hashchange'].forEach(function(e){
		window.addEventListener(e, function(){
			var index = 0;
			if (location.hash.indexOf('#') != -1) {
				var entry = location.hash.slice(location.hash.indexOf('#') + 1);
				if (routes.indexOf(entry) != -1) {
					index = routes.indexOf(entry);
				}
			}
			load(routes[index]);
		});
	});

	//grabs the new view and replaces stale view
	//this is the actual router
	function load(view) {
		var request = new XMLHttpRequest();
		request.open('GET', 'app/views/' + view + '/' + view + '.html', true);
		request.send();
		request.onreadystatechange = function () {
			if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
				document.getElementById('container').innerHTML = request.response;
				var style = document.querySelectorAll('link');
				Object.keys(style).forEach(function (e) {
					if (!style[e].getAttribute('href').includes('base.css')) {
						//can't do view conditional css; so it's removed
						style[e].remove();
					}
				});
				style = document.createElement('link');
				style.setAttribute('rel', 'stylesheet');
				style.setAttribute('href', 'app/views/' + view + '/' + view + '.css');
				style.setAttribute('onload', 'makeSausages()');
				document.head.appendChild(style);
			}
		};

		//custom event so we don't rely on hash changes to activate views
		request.onload = function () {
			var viewChange = new CustomEvent('viewChange', {
				'detail': view
			});
			document.dispatchEvent(viewChange);
			if (view != routes[0]) {
				location.hash = view;
			}
		};
	}
});

