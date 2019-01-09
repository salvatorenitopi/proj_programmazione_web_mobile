module.exports = {

	calcola: function (T, nome, callback){

		T.get('statuses/user_timeline', { screen_name: nome, count: 200 }, function(err, data, response) {

			if( !err && data != "undefined" && data != null && data.length > 0) {

				var u = require ('../metriche/0_user');
				var user_info = u.get_info (data);

				var c = require ('../metriche/0_classificazione');
				var classificazione = c.classifica (data);

				var totale = 0;
				var media = 0;
				var max = 0;

				var tempi = [];
				for (var i = 0; i < data.length; i++) {
					var d = new Date(data[i].created_at);					// Timestamp in millisecondi
					tempi.push(d.getTime());
				};	


				var medie = [];
				for (var i = 0; i < tempi.length - 1; i++) {

					var actual = (tempi[i] - tempi[i + 1]) / 1000 / 60		// Ottengo max per calcolare la percentuale
					if (actual > max){
						max = actual;
					}

					totale += (tempi[i] - tempi[i + 1]);					// Per il calcolo della media totale
					medie.push(( (tempi[i] - tempi[i + 1]) / 1000 / 60));	// Per il calcolo delle medie (in minuti)
				};

				media = (totale / data.length) / 1000 / 60;					// Media in minuti

				var out = { 'raw_array':medie, 'media':media, 'max':max,
							'class':classificazione, 'user':user_info 
						};
				return callback(null, out);

			}

			else {
				return callback(err);
			}

		});
	}
}
