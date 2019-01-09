module.exports = {

	calcola: function (T, nome, callback){

		T.get('statuses/user_timeline', { screen_name: nome, count: 200 }, function(err, data, response) {

			if( !err && data != "undefined" && data != null && data.length > 0) {

				var u = require ('../metriche/0_user');
				var user_info = u.get_info (data);

				var arr = []

				var tot_posts = data.length;
				var tot_photo = 0;
				var tot_video = 0;
				var tot_altro = 0;
				var tot_mixed = 0;

				var tot_link = 0;
				var tot_text = 0;

				for (var i = 0; i < data.length; i++) {

					var photo = 0;
					var video = 0;
					var altro = 0;

					var link = 0;
					var text = 0;
					
					// Nel caso in cui contenga dei media
					if (data[i].extended_entities != "undefined" && data[i].extended_entities != null){
						
						var media = data[i].extended_entities.media;

						for (var j = 0; j < media.length; j++) {
							if (media[j].type == "photo"){
								photo += 1;
							} else if (media[j].type == "video"){
								video += 1;
							} else {
								tot_altro += 1
								altro += 1;
							}
						}

					// Nel caso in cui non contenga dei media (Quindi è url o text semplice)
					} else {

						if (data[i].entities.urls.length > 0){	
							link += data[i].entities.urls.length;
						} else {
							text += 1;
						}
					}

					// Catalogo il tipo di post
					if (photo < video){
						tot_video += 1
					} else if (photo > video) {
						tot_photo += 1
					} else if (photo > 0 && video > 0 && photo == video) {
						tot_mixed += 1

					} else if (photo == 0 && video == 0) {
						if (link > 0){
							tot_link += 1;
						} else {
							tot_text += 1;
						}
					}

					/////////////////////////////////////////////////////////////////
					// Popolo l'array RAW

					var arr_photo = 0;
					var arr_video = 0;
					var arr_link = 0;
					var arr_text = 0;

					if (data[i].extended_entities != "undefined" && data[i].extended_entities != null){
						var media = data[i].extended_entities.media;

						for (var j = 0; j < media.length; j++) {
							if (media[j].type == "photo"){
								arr_photo += 1;
							} else if (media[j].type == "video"){
								arr_video += 1;
							}
						}
					}

					if (data[i].entities.urls.length > 0){
						arr_link = data[i].entities.urls.length;
					}

					// Se text è presente e non contiene esclusivamente un link al post
					if ("text" in data[i] && data[i].text.substring(0, 13) != "https://t.co/"){
						arr_text += 1;
					}

					arr.push ({"photo":arr_photo, "video":arr_video, "link":arr_link, "text":arr_text});
					/////////////////////////////////////////////////////////////////
				}

				var out = { 'raw_array':arr, 'photo':tot_photo, 'video':tot_video, 'mixed':tot_mixed, 
							'link':tot_link, 'text':tot_text, 'tot_posts':tot_posts, 'user':user_info 
						};

				return callback(null, out);

				//return callback(null, data);

			} else {
				return callback(err);
			}
		});

	}
};

// RICHIEDE RITOCCO