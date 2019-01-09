module.exports = {

	calcola: function (T, nomi, callback){

		function get_data (T, query){
			return new Promise (function (resolve, reject){
				T.get('search/tweets', { q: query, count: 200 }, function(err, data, response) {
					console.log (query);
					console.log (data.statuses.length);
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
		for (var i = 0; i < nomi.length; i++) {								// Scorre utente form:

				var query = "from:" + nomi[i];
				var arr = nomi.filter(function(x){return x != nomi[i]});	// Creo un array escludendo l'utente attuale
				out.push( {'user':nomi[i], 'mentions':[]} );


				for (var j = 0; j < arr.length; j++) {						// Scorre utenti target

					if (j > 0){												// Se non è il primo
						query += " OR @" + arr[j];
					} else {
						query += " @" + arr[j];
					}

				}

			promises.push( get_data (T, query) );

		};



		Promise.all(promises)

			.then (( values => {

				for (var i = 0; i < values.length; i++) {
					
					var sstatuses = values[i].statuses;

					for (var j = 0; j < sstatuses.length; j++) {
						
						var pos_name = sstatuses[j].user.screen_name;				// Utente che posta
						var tweet_id = sstatuses[j].id_str;
						var tweet_text = sstatuses[j].text;
						var mmentrions = sstatuses[j].entities.user_mentions;

						for (var k = 0; k < mmentrions.length; k++) {

							var men_user = 	mmentrions[k].screen_name				// Utente mensionato

							for (var u =0; u < nomi.length; u++){					// Scorro tutti gli utenti della lista fornita	(ritondanza?)
								if (pos_name != nomi[u] && men_user == nomi[u]){	// Mi accerto che l'utente sia presente e non sia se stesso (ritondanza?)
									console.log ("\n");
									console.log ("POSTANTE: " + pos_name);
									console.log ("MENZIONA: " + men_user);
									console.log ("TWEET ID: " + tweet_id);
									console.log ("TWEET TX: " + tweet_text);
								}
							
							}
							


						}

					}
				}

				/*for (var i = 0; i < values.length; i++) {					// Scorri fra gli utenti
					for (var j = 0; j < values.statuses[i].length; j++) {	// Scorri fra i tweet di un utente

						console.log(values[i]);

						/*var uname = values[i][j].user.screen_name;
						var tweet_id = values[i][j].id_str;		
						var mmentions = values[i][j].entities.user_mentions;


						for (var m = 0; m < mmentions.length; m++) {			// Scorri fra le mentions del tweet dell'utente
							for (var u = 0; u < out.length; u++) {				// Scorri fra i vari utenti della lista
								
								// Se l'utente menzionato non è se stesso ed è nella lista nomi
								if (mmentions[m].screen_name == nomi[u] && mmentions[m].screen_name != uname){
									for (var k = 0; k < out.length; k++) {

										if (out[k].user == uname){
											out[k].mentions.push ({ 'muser':mmentions[m].screen_name, 'tweet_id':tweet_id });
										}

									}
								}

							}
						}

					}
				}*/

				
				return callback(null, out);

			}))

			.catch((err) => {
				return callback(err);
			});

	}
}

// RICHIEDE RITOCCO