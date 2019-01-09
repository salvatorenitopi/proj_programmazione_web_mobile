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

				var mentions = [];	// Vengono raccolte le mentrions fatte dall'utente nei singoli post per poterle graficare
				for (var i = 0; i < data.length; i++) {

					var actual = data[i].entities.user_mentions.length	// Ottengo max per calcolare la percentuale
					if (actual > max){
						max = actual;
					}

					mentions.push(data[i].entities.user_mentions.length);
					totale += data[i].entities.user_mentions.length;
				};

				media = (totale / data.length);

				var out = { 'raw_array':mentions, 'media':media, 'max':max,
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
