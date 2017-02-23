//this makes PERFECT sausages!
'use strict';
function makeSausages() {
	var sausage = document.querySelectorAll('.sausage');
	Object.keys(sausage).forEach(function (e) {
		sausage[e].setAttribute('style', 'border-radius: ' + (sausage[e].offsetHeight / 2) + 'px / 50%');
	});

	//why you would ever need vertical sausages, I have no idea.
	var vSausage = document.querySelectorAll('.sausage-v')
	Object.keys(vSausage).forEach(function (e) {
		vSausage[e].setAttribute('style', 'border-radius: 50% / ' + (vSausage[e].offsetWidth / 2) + 'px');
	});
}