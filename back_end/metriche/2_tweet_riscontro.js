module.exports = {

	calcola: function (T, nome, callback){

		T.get('statuses/user_timeline', { screen_name: nome, count: 200 }, function(err, data, response) {

			if( !err && data != "undefined" && data != null && data.length > 0) {

				var u = require ('../metriche/0_user');
				var user_info = u.get_info (data);

				var riscontri = []

				var tot_posts = data.length;
				var tot_retweeted = 0;
				var tot_favorited = 0;
				var tot_reply = 0;

				//console.log (data);

				for (var i = 0; i < data.length; i++) {
					var favorited = 0;
					var retweeted = 0;
					var reply = 0;

					if (data[i].favorite_count > 0){
						favorited = data[i].favorite_count;
						tot_favorited += 1;
					}

					if (data[i].retweet_count > 0){
						retweeted = data[i].retweet_count;
						tot_retweeted += 1;
					}

					if (data[i].in_reply_to_status_id != null){			// SBAGLIATO, bisognerbbe interrogare
						reply = 1;										// l'api per ogni post
						tot_reply += 1;									
					}

					// Raccolgo i riscontri per ogni post per poi poterli graficare
					riscontri.push ({"favorited":favorited, "retweeted":retweeted, "reply":reply});
				}


				var out = { 'raw_array':riscontri, 'favorited':tot_favorited, 'retweeted':tot_retweeted, 
							'replyed':tot_reply, "tot_posts":tot_posts,'user':user_info
						};
				return callback(null, out);

			} else {
				return callback(err);
			}
		});

	}
};