let s,t=3,gameon=false,points=0;

document.getElementsByTagName('input')[0].addEventListener('input',()=>{ //word input
	let v = document.getElementsByTagName('input')[0].value.trim().toLowerCase();
	let w = document.getElementById('word').innerHTML; 
	if(v===w && gameon===true){
		points+=v.length;
		document.getElementById('message').classList.remove('alert-danger');
		document.getElementById('message').classList.add('alert-primary');
		document.querySelector('.alert-heading').innerHTML=`Correct . Total Points = ${points}`;
		clearInterval(s);
		t=3;
		setTimeout(start,125);
	}
})

document.getElementsByTagName('button')[0].addEventListener('click',()=>{ //reset button
	t=3;
	points=0;
	clearInterval(s);
	document.getElementById('body').classList.remove("bg-danger","text-white");
    document.getElementById('message').classList.remove('alert-danger');
    document.querySelector('.alert-heading').innerHTML=``;
    document.getElementsByTagName('input')[0].focus();
	setTimeout(start,1000);
})

function start(){ //api calls
	let key='439UPOLJ';
	let url=`https://random-word-api.herokuapp.com/word?key=${key}&number=1`;
	fetch(url).then(res=>{
		return res.json();
	}).then(res=>{
		s = setInterval(timer,1000);
		document.getElementById('word').innerHTML = res[0];
		document.getElementsByTagName('input')[0].value='';
		gameon=true;
	}).catch(err=>{
		console.log(err);
	})
}

function timer(){ //timer
	document.getElementById('timer').innerHTML = `Time Left : ${t}s`;
	if(t>0)		
		t--;
	else{	
		  document.getElementById('body').classList.add("bg-danger","text-white");	
	  	  document.getElementById('message').classList.remove('alert-primary');
		  document.getElementById('message').classList.add('alert-danger');
		  document.querySelector('.alert-heading').innerHTML=`Game Over. Total Points = ${points}`;
		  clearInterval(s);
		  gameon=false;
		  t=3;
	}
}