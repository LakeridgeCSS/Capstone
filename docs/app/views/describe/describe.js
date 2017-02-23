'use strict';
document.addEventListener('viewChange', function (e) {
	if (e.detail == 'describe') {
		var currentTime = new Date();
		var date = document.querySelectorAll('input[type=datetime-local]');
		Object.keys(date).forEach(function (e) {
			date[e].value = currentTime.getFullYear() + '-' +
				pad(currentTime.getMonth() + 1) + '-' +
				pad(currentTime.getDate() + 1) + 'T' +
				pad(currentTime.getHours()) + ':' + 
				pad(currentTime.getMinutes());
		});

		function pad(n) {
			return (n < 10) ? ('0' + n) : n;
		}

		document.addEventListener('dataSave', function () {
			location.hash = 'before';
		});
	}
});
