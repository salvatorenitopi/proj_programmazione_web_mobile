module.exports = {

	media_temporale: function (data) {
		
		var totale = 0;
		var media = 0;
		var max = 0;

		var tempi = [];
		for (var i = 0; i < data.length; i++) {
			var d = new Date(data[i].created_at);					// Timestamp in millisecondi
			tempi.push(d.getTime());
		}

		for (var i = 0; i < tempi.length - 1; i++) {

			var actual = (tempi[i] - tempi[i + 1]) / 1000 / 60		// Ottengo max per calcolare la percentuale
			if (actual > max){
				max = actual;
			}

			totale += (tempi[i] - tempi[i + 1]);					// Per il calcolo della media totale
		}

		media = (totale / data.length) / 1000 / 60;

		return {'media':media, 'max':max};
	},

///////////////////////////////////////////////////////////////////////////////////////////////////

	media_retweets: function (data) {

		var totale = 0;
		var media = 0;
		var max = 0;

		for (var i = 0; i < data.length; i++) {
			
			var actual = data[i].retweet_count		// Ottengo max per calcolare la percentuale
			if (actual > max){
				max = actual;
			}

			totale += data[i].retweet_count;
		};	

		media = (totale / data.length);

		return {'media':media, 'max':max};
	},

///////////////////////////////////////////////////////////////////////////////////////////////////

	media_mentions: function (data) {

		var totale = 0;
		var media = 0;
		var max = 0;

		for (var i = 0; i < data.length; i++) {

			var actual = data[i].entities.user_mentions.length	// Ottengo max per calcolare la percentuale
			if (actual > max){
				max = actual;
			}

			totale += data[i].entities.user_mentions.length;
		};

		media = (totale / data.length);

		return {'media':media, 'max':max};
	},

///////////////////////////////////////////////////////////////////////////////////////////////////

	list_mentions: function (data, nomi) {

		out = [];

		var u_screen_name = data[0].user.screen_name;
		//var u_name = data[0].user.name;
		//var u_img = data[0].user.profile_image_url_https.replace("normal", "400x400");

		for (var i = 0; i < data.length; i++) {						// Scorro i tweet dell'utente

			var tweet_id = data[i].id_str;
			var tweet_text = data[i].text;
			var mmentions = data[i].entities.user_mentions;

			for (var m = 0; m < mmentions.length; m++) {			// Scorro le mention dei tweet dell'utente
				for (var u = 0; u < nomi.length; u++) {				// Scorri fra i vari utenti della lista

					// Se l'utente menzionato non è se stesso ed è nella lista nomi
					if (mmentions[m].screen_name == nomi[u] && mmentions[m].screen_name != u_screen_name){
						
						out.push ({ 'muser':mmentions[m].screen_name, 'tweet_id':tweet_id, 'tweet_text':tweet_text });

					}
				}
			}
		}

		return out;

	}
}










