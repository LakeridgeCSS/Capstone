//this makes PERFECT sausages!
'use strict';
function makeSausages() {
	document.querySelectorAll('.sausage').forEach(function (e) {
		e.style.borderRadius = (e.offsetHeight / 2) + 'px / 50%';
	});

	//why you would ever need vertical sausages, I have no idea.
	document.querySelectorAll('.sausage-v').forEach(function (e) {
		e.style.borderRadius ='50% / ' + (e.offsetWidth / 2) + 'px';
	});
}