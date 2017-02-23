'use strict';
document.addEventListener('viewChange', function (e) {
	if (e.detail == 'before') {
		document.addEventListener('dataSave', function () {
			location.hash = 'after';
		});
	}
});