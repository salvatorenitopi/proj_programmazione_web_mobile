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
			url: 'http://127.0.0.1:8000/metrica_mix'
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

	add_crono ("Metriche Mix", document.getElementById("inp_names").value);

	for (i=0; i<data.data.length; i++){
		
		var user = data.data[i].user;
		var clas = data.data[i].class;
		var m_temporale = data.data[i].m_temporale;
		var m_retweets = data.data[i].m_retweets;
		var m_mantions = data.data[i].m_mantions;
		var l_mantions = data.data[i].l_mantions;

		document.body.innerHTML += '<div id="user_container-' + i.toString() + '" class="container deletable">\
		<div class="row metrics-row">\
			<div class="col-md-12 col-sm-12 col-xs-12">\
				<div class="horizontal-center-div">\
					<img id="user_img" src="' + user.user_img + '" class="img-circle img_profilo" alt="Immagine del profilo">\
					<span class="align-middle" id="user_info">\
						<b>Username:</b> ' + user.screen_name + '<br><b>Nome:</b> '+ user.name +'<br>\
						<b>Post:</b> ' + user.statuses_count + '<br><b>Followers:</b> ' + user.followers_count + '<br>\
					</span>\
				</div>\
			</div>\
		</div>\
		<div class="row metrics-row">\
			<div class="col-md-12 col-sm-12 col-xs-12"><p margin-top:15px><b>Classificazione:</b></p><hr style="margin:5px"></div>\
			<div class="col-md-2 col-sm-4 col-xs-4">\
				<div id="class_foto_chart_div-' + i.toString() + '" class="counter"></div>\
				<div id="class_foto_text_div-' + i.toString() + '" class="text-center"></div>\
			</div>\
			<div class="col-md-2 col-sm-4 col-xs-4">\
				<div id="class_video_chart_div-' + i.toString() + '" class="counter"></div>\
				<div id="class_video_text_div-' + i.toString() + '" class="text-center"></div>\
			</div>\
			<div class="col-md-1 col-sm-0 col-xs-0">\
				<div></div>\
			</div>\
			<div class="col-md-2 col-sm-4 col-xs-4">\
				<div id="class_mixed_chart_div-' + i.toString() + '" class="counter"></div>\
				<div id="class_mixed_text_div-' + i.toString() + '" class="text-center"></div>\
			</div>\
			<div class="col-md-1 col-sm-0 col-xs-0">\
				<div></div>\
			</div>\
			<div class="col-md-2 col-sm-6 col-xs-6">\
				<div id="class_link_chart_div-' + i.toString() + '" class="counter"></div>\
				<div id="class_link_text_div-' + i.toString() + '" class="text-center"></div>\
			</div>\
			<div class="col-md-2 col-sm-6 col-xs-6">\
				<div id="class_text_chart_div-' + i.toString() + '" class="counter"></div>\
				<div id="class_text_text_div-' + i.toString() + '" class="text-center"></div>\
			</div>\
		</div>\
		<div class="row metrics-row">\
			<div class="col-md-12 col-sm-12 col-xs-12"><p margin-top:15px><b>Riscontro:</b></p><hr style="margin:5px"></div>\
			<div class="col-md-4 col-sm-4 col-xs-4">\
				<div id="risc_like_chart_div-' + i.toString() + '" class="counter"></div>\
				<div id="risc_like_text_div-' + i.toString() + '" class="text-center"></div>\
			</div>\
			<div class="col-md-4 col-sm-4 col-xs-4">\
				<div id="risc_retweetted_chart_div-' + i.toString() + '" class="counter"></div>\
				<div id="risc_retweetted_text_div-' + i.toString() + '" class="text-center"></div>\
			</div>\
			<div class="col-md-4 col-sm-4 col-xs-4">\
				<div id="risc_reply_chart_div-' + i.toString() + '" class="counter"></div>\
				<div id="risc_reply_text_div-' + i.toString() + '" class="text-center"></div>\
			</div>\
		</div>\
		<div class="row metrics-row">\
			<div class="col-md-12 col-sm-12 col-xs-12"><p margin-top:15px><b>Medie:</b></p><hr style="margin:5px"></div>\
			<div class="col-md-4 col-sm-4 col-xs-4">\
				<div id="m_temporale_chart_div-' + i.toString() + '" class="counter"></div>\
				<div id="m_temporale_text_div-' + i.toString() + '" class="text-center"></div>\
			</div>\
			<div class="col-md-4 col-sm-4 col-xs-4">\
				<div id="m_retweets_chart_div-' + i.toString() + '" class="counter"></div>\
				<div id="m_retweets_text_div-' + i.toString() + '" class="text-center"></div>\
			</div>\
			<div class="col-md-4 col-sm-4 col-xs-4">\
				<div id="m_mantions_chart_div-' + i.toString() + '" class="counter"></div>\
				<div id="m_mantions_text_div-' + i.toString() + '" class="text-center"></div>\
			</div>\
		</div>\
		<div class="row metrics-row">\
			<div class="col-md-12 col-sm-12 col-xs-12"><p margin-top:15px><b>Mantions:</b></p><hr style="margin:5px; margin-bottom:20px"></div>\
			<div class="col-md-12 col-sm-12 col-xs-12">\
				<div id="ment-' + i.toString() + '-div">\
				</div>\
			</div>\
		</div>\
		</div>'

		if (l_mantions.length > 0){

			for (j=0; j < l_mantions.length; j+=2){
				document.getElementById('ment-' + i.toString() + '-div').innerHTML += '<ul class="list-group">\
				<li class="list-group-item"><b>Utente Mezionato:</b> ' + l_mantions[j].muser + '</li>\
				<li class="list-group-item"><b>Tweet ID:</b> \
					<a href="https://www.twitter.com/statuses/' + l_mantions[j].tweet_id + '" target="_blank">' + l_mantions[j].tweet_id + '</a>\
				</li>\
				<li class="list-group-item"><b>Tweet Testo:</b> ' + l_mantions[j].tweet_text + '</li>\
				</ul>';
			}

		} else {
			document.getElementById('ment-' + i.toString() + '-div').innerHTML += '<div class="horizontal-center-div">\
			<b>Nessuna Mentions</b></div>';
		}



		document.getElementById("class_foto_chart_div-" + i.toString()).innerHTML = generate_svg(clas.photo, clas.tot_posts, "#0066cc");
		document.getElementById("class_foto_text_div-" + i.toString()).innerHTML = "<p>Foto: " + clas.photo + "</p>";

		document.getElementById("class_video_chart_div-" + i.toString()).innerHTML = generate_svg(clas.video, clas.tot_posts, "#ff4d4d");
		document.getElementById("class_video_text_div-" + i.toString()).innerHTML = "<p>Video: " + clas.video + "</p>";

		document.getElementById("class_mixed_chart_div-" + i.toString()).innerHTML = generate_svg(clas.mixed, clas.tot_posts, "#cc6600");
		document.getElementById("class_mixed_text_div-" + i.toString()).innerHTML = "<p>Mixed: " + clas.mixed + "</p>";

		document.getElementById("class_link_chart_div-" + i.toString()).innerHTML = generate_svg(clas.link, clas.tot_posts, "#ffcc00");
		document.getElementById("class_link_text_div-" + i.toString()).innerHTML = "<p>Link: " + clas.link + "</p>";

		document.getElementById("class_text_chart_div-" + i.toString()).innerHTML = generate_svg(clas.text, clas.tot_posts, "#009933");
		document.getElementById("class_text_text_div-" + i.toString()).innerHTML = "<p>Text: " + clas.text + "</p>";


		document.getElementById("risc_like_chart_div-" + i.toString()).innerHTML = generate_svg(clas.favorited, clas.tot_posts, "#0066cc");
		document.getElementById("risc_like_text_div-" + i.toString()).innerHTML = "<p>Like: " + clas.favorited + "</p>";

		document.getElementById("risc_retweetted_chart_div-" + i.toString()).innerHTML = generate_svg(clas.retweeted, clas.tot_posts, "#ff4d4d");
		document.getElementById("risc_retweetted_text_div-" + i.toString()).innerHTML = "<p>Retweeted: " + clas.retweeted + "</p>";

		document.getElementById("risc_reply_chart_div-" + i.toString()).innerHTML = generate_svg(clas.replyed, clas.tot_posts, "#cc6600");
		document.getElementById("risc_reply_text_div-" + i.toString()).innerHTML = "<p>Reply: " + clas.replyed + "</p>";


		document.getElementById("m_temporale_chart_div-" + i.toString()).innerHTML = generate_svg(m_temporale.media.toFixed(2), m_temporale.max.toFixed(2), "#0066cc");
		document.getElementById("m_temporale_text_div-" + i.toString()).innerHTML = "<p>Media Temporale: " + m_temporale.media.toFixed(2) + "</p>";

		document.getElementById("m_retweets_chart_div-" + i.toString()).innerHTML = generate_svg(m_retweets.media.toFixed(2), m_retweets.max, "#ff4d4d");
		document.getElementById("m_retweets_text_div-" + i.toString()).innerHTML = "<p>Media Retweets: " + m_retweets.media.toFixed(2) + "</p>";

		document.getElementById("m_mantions_chart_div-" + i.toString()).innerHTML = generate_svg(m_mantions.media.toFixed(2), m_mantions.max, "#cc6600");
		document.getElementById("m_mantions_text_div-" + i.toString()).innerHTML = "<p>Media Mantions: " + m_mantions.media.toFixed(2) + "</p>";

	}
}

function generate_svg (value, max, color){
	var percent = (value * 100) / max;
	var out = '<svg width="100%" height="100%" viewBox="0 0 42 42">\
		<circle cx="21" cy="21" r="15" fill="transparent"></circle>\
		<circle cx="21" cy="21" r="15" fill="transparent" stroke="#d2d3d4" stroke-width="5"></circle>\
		<circle cx="21" cy="21" r="15" fill="transparent" stroke="'+color+'" stroke-width="5" stroke-dasharray="'+percent+' 100" stroke-dashoffset="0"></circle>\
	</svg>';
	return out;
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