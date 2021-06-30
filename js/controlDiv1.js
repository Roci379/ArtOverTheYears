// Function called when any of the buttons to change year is clicked on 

function changeYear(time){
	
	var newTime = (parseInt(document.getElementById("fecha").value) + time);
	console.log(newTime);
	if(newTime<1990 && newTime>1265){
		document.getElementById("fecha").value = newTime;
		document.getElementById("fecha").onchange();
	}

}

