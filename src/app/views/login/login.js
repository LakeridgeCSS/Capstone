let request = new XMLHttpRequest();
request.open('GET', 'app/views/login/login.html', true);
request.send();
request.onreadystatechange = function(){
	document.getElementById('container').innerHTML = request.response;
};
