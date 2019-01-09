google.charts.load("current", {packages:["corechart"]});
//document.getElementById("btn_submit").addEventListener('click', fx_a, false);

function fx_run (){

	var nomi = document.getElementById("inp_names").value;

	if (nomi == "" || nomi == null){
		error_man ("Il campo è vuoto");

	} else {
		status_man ("Richiesta in corso...");

		$.ajax({
			type: 'POST',
			data: 'nomi=' + nomi,
			url: 'http://127.0.0.1:8000/lista_mentions'
		})
		.done(function(data, err) {

			var jdata = JSON.parse(data)

			if (jdata.error == 0){
				status_man ("");
				handle_data(jdata);

			} else {
				error_man ("Errore: " + JSON.stringify(jdata.data));
			}

		})
		.fail(function(err) {
			error_man ("Errore nella richiesta AJAX");
		})
	}

}

function handle_data(data){

	$('.deletable').remove();	// Rimuovo tutti gli elementi con la classe deletable
	
	add_crono ("Lista Mentions", document.getElementById("inp_names").value);

	for (i=0; i<data.data.length; i++){
		var screen_name = data.data[i].screen_name;
		var name = data.data[i].name;
		var user_img = data.data[i].user_img;
		var mentions = data.data[i].mentions;

		document.body.innerHTML += '<div id="user_container-' + i.toString() + '" class="container deletable">\
		<div class="row">\
			<div class="col-md-4 col-sm-6 col-xs-12">\
				<div class="horizontal-center-div">\
					<img id="user_img" src="' + user_img + '" class="img-circle img_profilo" alt="Immagine del profilo">\
					<span class="align-middle">\
						<b>Username:</b> '+screen_name+'<br>\
						<b>Nome:</b> '+name+'<br>\
					</span>\
				</div>\
			</div>\
			<div class="col-md-8 col-sm-6 col-xs-12">\
				<div id="' + screen_name + '-div">\
				</div>\
			</div>\
		</div>'

		if (mentions.length > 0){

			for (j=0; j<mentions.length; j++){
				document.getElementById(screen_name + '-div').innerHTML += '<ul class="list-group">\
				<li class="list-group-item"><b>Utente Mezionato:</b> ' + mentions[j].muser + '</li>\
				<li class="list-group-item"><b>Tweet ID:</b> \
					<a href="https://www.twitter.com/statuses/' + mentions[j].tweet_id + '" target="_blank">' + mentions[j].tweet_id + '</a>\
				</li>\
				<li class="list-group-item"><b>Tweet Testo:</b> ' + mentions[j].tweet_text + '</li>\
				</ul>';
			}

		} else {
			document.getElementById(screen_name + '-div').innerHTML += '<div class="horizontal-center-div" style="padding-top: 40px;">\
			<b>Nessuna Mentions</b></div>';
		}

	}
}

function status_man (msg){
	if (msg.length > 0){
		document.getElementById("message-container").classList.remove("hidden");
		document.getElementById("message").innerHTML = '<div class="alert alert-info" role="alert" style="margin-bottom:0px">' + msg + '</div>';
	} else {
		document.getElementById("message-container").classList.add("hidden");
	}
}

function error_man (msg){
	if (msg.length > 0){
		document.getElementById("message-container").classList.remove("hidden");
		document.getElementById("message").innerHTML = '<div class="alert alert-danger" role="alert" style="margin-bottom:0px">' + msg + '</div>';
	} else {
		document.getElementById("message-container").classList.add("hidden");
	}

}