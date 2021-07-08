function pageinit(){
	var today = new Date();
	var day = today.getDay();
	var hour = today.getHours();

	if(hour >= 18) day++;
	if(0 < day && day < 6){
		var getid = 2 * day - ((12 < hour && hour < 18) ? 0 : 1);
		getid = "m" + getid;
		console.log(getid);
		document.getElementById(getid).style.backgroundColor = "rgb(103, 132, 226)";
		document.getElementById(getid).style.color = "white";
	}
}