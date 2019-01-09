module.exports = {

	calcola: function (T, nomi, callback){

		function get_data (T, nome){
			return new Promise (function (resolve, reject){
				T.get('statuses/user_timeline', { screen_name: nome, count: 200 }, function(err, data, response) {

					if (err){
						reject (err);
					} else {
						resolve (data);
					}

				});
			});
		}

		var promises = [];
		var out = [];
		for (var i = 0; i < nomi.length; i++) {
			promises.push( get_data (T, nomi[i]) );
		};

		Promise.all(promises)

			.then (( values => {

				var u = require ('../metriche/0_user');
				var c = require ('../metriche/0_classificazione');
				var m = require ('../metriche/0_mix');

				for (var i = 0; i < values.length; i++) {		// Scorro il risultato utente per utente

					var user_info = u.get_info (values[i]);
					var classificazione = c.classifica (values[i]);

					var m_temporale = m.media_temporale (values[i]);
					var m_retweets = m.media_retweets (values[i]);
					var m_mantions = m.media_mentions (values[i]);
					var l_mantions = m.list_mentions (values[i], nomi);

					out.push ({
								'user':user_info, 'class':classificazione, 'm_temporale':m_temporale, 
								'm_retweets':m_retweets, 'm_mantions':m_mantions, 'l_mantions':l_mantions
							});
				}

				
				return callback(null, out);

			}))

			.catch((err) => {
				return callback(err);
			});

	}
}
