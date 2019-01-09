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
			out.push( {'screen_name':nomi[i], 'name':'', 'user_img':'', 'mentions':[]} ); 
		};

		Promise.all(promises)

			.then (( values => {

				for (var i = 0; i < values.length; i++) {				// Scorri fra gli utenti
					for (var j = 0; j < values[i].length; j++) {		// Scorri fra i tweet di un utente

						var u_screen_name = values[i][j].user.screen_name;
						var u_name = values[i][j].user.name;
						var u_img = values[i][j].user.profile_image_url_https.replace("normal", "400x400");
						var tweet_id = values[i][j].id_str;
						var tweet_text = values[i][j].text;
						var mmentions = values[i][j].entities.user_mentions;

						for (var u = 0; u < out.length; u++) {				// Scorri fra i vari utenti della lista per assegnare i dati
							if (out[u].screen_name == u_screen_name){
								out[u].name = u_name;
								out[u].user_img = u_img;
							}
						}

						for (var m = 0; m < mmentions.length; m++) {			// Scorri fra le mentions del tweet dell'utente
							for (var u = 0; u < out.length; u++) {				// Scorri fra i vari utenti della lista
								
								// Se l'utente menzionato non è se stesso ed è nella lista nomi
								if (mmentions[m].screen_name == nomi[u] && mmentions[m].screen_name != u_screen_name){
									for (var k = 0; k < out.length; k++) {		// Scorri gli utenti presenti nell'output per trovare l'utente attuale

										if (out[k].screen_name == u_screen_name){
											//console.log ("POSTANTE: " + u_screen_name);
											//console.log ("MENZIONA: " + mmentions[m].screen_name);
											//console.log ("TWEET ID: " + tweet_id);
											//console.log ("TWEET TX: " + values[i][j].text);
											//console.log("\n");
											out[k].mentions.push ({ 'muser':mmentions[m].screen_name, 'tweet_id':tweet_id, 'tweet_text':tweet_text });
										}

									}
								}

							}
						}

					}
				}

				
				return callback(null, out);

			}))

			.catch((err) => {
				return callback(err);
			});

	}
}
