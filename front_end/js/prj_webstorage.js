function add_crono (data, utente){
	var cronologia = [];

	if (localStorage.length != 0) {
		cronologia = JSON.parse(localStorage.getItem("cronologia"));
	}

	var today = new Date();
	var date = str_pad(today.getDate())+"/"+str_pad((today.getMonth()+1))+"/"+today.getFullYear();
	var time = str_pad(today.getHours()) + ":" + str_pad(today.getMinutes())+":"+str_pad(today.getSeconds());
	var dateTime = date + " " + time;

	cronologia.push ({'time':dateTime, 'metrica':data, 'utente':utente});
	localStorage.setItem("cronologia", JSON.stringify(cronologia));
}

function str_pad(n) {
    return String("00" + n).slice(-2);
}


function get_crono (){
	var cronologia = [];

	if (localStorage.length != 0) {
		cronologia = JSON.parse(localStorage.getItem("cronologia"));
	}

	return cronologia;
}



function reset_crono (){
	localStorage.removeItem("cronologia");
}