google.charts.load("current", {packages:["corechart"]});
//document.getElementById("btn_submit").addEventListener('click', fx_a, false);

function fx_run (){

	var name = document.getElementById("inp_name").value;

	if (name == "" || name == null){
		error_man ("Il campo è vuoto");

	} else {
		status_man ("Richiesta in corso...");

		$.ajax({
			url: 'http://127.0.0.1:8000/tweet_type?nome=' + name,
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

	document.getElementById("conn_user").classList.remove("hidden");
	document.getElementById("con_classificazione").classList.remove("hidden");
	document.getElementById("con_chart").classList.remove("hidden");
	
	user_data (data);
	classificazione (data);
	add_crono ("Tipo Tweet", data.data.user.screen_name);

	var raw = data.data.raw_array; 
	var arr = [["Post", "Foto", "Video", "Link", "Testo"]];
	for (i=0; i<raw.length; i++){
		arr.push ([i + 1, raw[i].photo, raw[i].video, raw[i].link, raw[i].text]);
	}

	var options = {
		title: "Tipi di dati contenuti nei Tweets",
		hAxis: {title: "Singoli Tweets",  titleTextStyle: {color: '#333'}},
		vAxis: {minValue: 0}
	};

	var element = "chart_div_1";

	$(window).resize(function(){
		draw_area_chart();
	});

	google.charts.setOnLoadCallback(draw_area_chart);


	function draw_area_chart() {
		var data = google.visualization.arrayToDataTable(arr);

		var chart = new google.visualization.SteppedAreaChart(document.getElementById(element));
		chart.draw(data, options);
	}
	
}

function user_data (data){

	var user_img = data.data.user.user_img;
	var screen_name = data.data.user.screen_name;
	var user_name = data.data.user.name;
	var statuses_count = data.data.user.statuses_count;
	var followers_count = data.data.user.followers_count;

	document.getElementById("user_img").src = user_img;
	document.getElementById("user_info").innerHTML = '<b>Username:</b> '+screen_name+'<br>\
	<b>Nome:</b> '+user_name+'<br><b>Post:</b> '+statuses_count+'<br><b>Followers:</b> '+followers_count+'<br>'
}

function classificazione (data){

	var tot_posts = data.data.tot_posts;		// Per fare la percentuale
	var tot_photo = data.data.photo;
	var tot_video = data.data.video;
	var tot_mixed = data.data.mixed;
	var tot_link = data.data.link;
	var tot_text = data.data.text;

	document.getElementById("class_foto_chart_div").innerHTML = generate_svg(tot_photo, tot_posts, "#0066cc");
	document.getElementById("class_foto_text_div").innerHTML = "<p>Foto: " + tot_photo + "</p>";

	document.getElementById("class_video_chart_div").innerHTML = generate_svg(tot_video, tot_posts, "#ff4d4d");
	document.getElementById("class_video_text_div").innerHTML = "<p>Video: " + tot_video + "</p>";

	document.getElementById("class_mixed_chart_div").innerHTML = generate_svg(tot_mixed, tot_posts, "#cc6600");
	document.getElementById("class_mixed_text_div").innerHTML = "<p>Mixed: " + tot_mixed + "</p>";

	document.getElementById("class_link_chart_div").innerHTML = generate_svg(tot_link, tot_posts, "#ffcc00");
	document.getElementById("class_link_text_div").innerHTML = "<p>Link: " + tot_link + "</p>";

	document.getElementById("class_text_chart_div").innerHTML = generate_svg(tot_text, tot_posts, "#009933");
	document.getElementById("class_text_text_div").innerHTML = "<p>Text: " + tot_text + "</p>";
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