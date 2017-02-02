let request = new XMLHttpRequest();
request.open('GET', 'app/views/login/login.html', true);
request.send();
request.onreadystatechange = function(){
	if(request.readyState === XMLHttpRequest.DONE && request.status === 200){
		document.getElementById('container').innerHTML = request.response;
	}
};
