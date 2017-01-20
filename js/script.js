window.addEventListener('DOMContentLoaded', function () {
	console.log('hello');
	document.querySelector('form').addEventListener('submit', function (e) {
		e.preventDefault();
	});
});