google.charts.load("current", {packages:["corechart"]});
//document.getElementById("btn_submit").addEventListener('click', fx_a, false);

function fx_a (){

	var name = document.getElementById("inp_name").value;

	if (name == "" || name == null){
		error_man ("Il campo è vuoto");

	} else {
		status_man ("Richiesta in corso...");

		$.ajax({
			url: 'http://127.0.0.1:8000/media_temporale?nome=' + name,
		})
		.done(function(data, err) {
			status_man ("");
			handle_data(data);
		})
		.fail(function(err) {
			error_man ("Errore nella richiesta AJAX");
		})
	}

}

function handle_data(data){
	//console.log (data);
	//document.body.innerHTML += "<div>" + data + "</div>";
	var raw = JSON.parse(data).data.raw_array;
	var arr = [["Media", "Minuti"]];
	for (i=0; i<raw.length; i++){
		arr.push ([i + 1, raw[i]]);
	}

	var options = {
		title: "Medie Temporali Tweets",
		hAxis: {title: "Medie parziali tra coppie di post (In minuti)",  titleTextStyle: {color: '#333'}},
		vAxis: {minValue: 0}
	};

	var element = "chart_div_1";

	$(window).resize(function(){
		draw_area_chart();
	});

	google.charts.setOnLoadCallback(draw_area_chart);


	function draw_area_chart() {
		var data = google.visualization.arrayToDataTable(arr);

		var chart = new google.visualization.AreaChart(document.getElementById(element));
		chart.draw(data, options);
	}
	
}


function status_man (msg){
	document.getElementById("lbl_status").style = "color: black";
	document.getElementById("lbl_status").innerHTML = msg;
}

function error_man (msg){
	document.getElementById("lbl_status").style = "color: red";
	document.getElementById("lbl_status").innerHTML = msg;
}