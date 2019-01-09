google.charts.load("current", {packages:["corechart"]});
//document.getElementById("btn_submit").addEventListener('click', fx_a, false);

function fx_run (){

	var name = document.getElementById("inp_name").value;

	if (name == "" || name == null){
		error_man ("Il campo è vuoto");

	} else {
		status_man ("Richiesta in corso...");

		$.ajax({
			url: 'http://127.0.0.1:8000/tweet_riscontro?nome=' + name,
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
	document.getElementById("con_riscontro").classList.remove("hidden");
	document.getElementById("con_chart").classList.remove("hidden");
	
	user_data (data);
	riscontro (data);
	add_crono ("Riscontro Tweet", data.data.user.screen_name);

	var raw = data.data.raw_array; 
	var arr = [["Post", "Like", "Retweeted", "Reply"]];
	for (i=0; i<raw.length; i++){
		arr.push ([i + 1, raw[i].favorited, raw[i].retweeted, raw[i].reply]);
	}

	var options = {
		title: "Riscontri dei vari Tweets",
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

function riscontro (data){

	var tot_posts = data.data.tot_posts;			// Per fare la percentuale
	var tot_favorited = data.data.favorited;
	var tot_retweeted = data.data.retweeted;
	var tot_reply = data.data.replyed;
	

	document.getElementById("risc_like_chart_div").innerHTML = generate_svg(tot_favorited, tot_posts, "#0066cc");
	document.getElementById("risc_like_text_div").innerHTML = "<p>Like: " + tot_favorited + "</p>";

	document.getElementById("risc_retweetted_chart_div").innerHTML = generate_svg(tot_retweeted, tot_posts, "#ff4d4d");
	document.getElementById("risc_retweetted_text_div").innerHTML = "<p>Retweeted: " + tot_retweeted + "</p>";

	document.getElementById("risc_reply_chart_div").innerHTML = generate_svg(tot_reply, tot_posts, "#cc6600");
	document.getElementById("risc_reply_text_div").innerHTML = "<p>Reply: " + tot_reply + "</p>";

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