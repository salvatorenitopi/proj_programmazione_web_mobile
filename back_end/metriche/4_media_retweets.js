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

				var retweet = [];	// Vengono raccolti i retweet dei singoli post per poterli graficare
				for (var i = 0; i < data.length; i++) {
					
					var actual = data[i].retweet_count		// Ottengo max per calcolare la percentuale
					if (actual > max){
						max = actual;
					}

					retweet.push(data[i].retweet_count);
					totale += data[i].retweet_count;
				};	

				media = (totale / data.length);

				var out = { 'raw_array':retweet, 'media':media, 'max':max,
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
