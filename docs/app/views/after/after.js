'use strict';
document.addEventListener('viewChange', function (e) {
	if (e.detail == 'after') {
		document.addEventListener('dataSave', function () {
			//gen csv
			var csv = 'data:text/csv;charset=utf-8,';
			Object.keys(sessionStorage).map(function (k) {
				csv += k + ',' + sessionStorage.getItem(k) + '\n';
			});
			csv = encodeURI(csv);
			var link = document.createElement('a');
			link.setAttribute('href', csv);
			link.setAttribute('download', 'toBeNamed.csv');
			document.body.appendChild(link);
			link.click(); //edge still has click bug
		});
	}
});