// E' la fusione della metrica 1 e 2, utilizzabile come funzione di classificazione
// su qualunque altra metrica

module.exports = {

	classifica: function (data){

		var tot_posts = data.length;
		var tot_photo = 0;
		var tot_video = 0;
		var tot_altro = 0;
		var tot_mixed = 0;

		var tot_link = 0;
		var tot_text = 0;

		var tot_retweeted = 0;
		var tot_favorited = 0;
		var tot_reply = 0;

		for (var i = 0; i < data.length; i++) {

			if (data[i].favorite_count > 0){
				tot_favorited += 1;
			}

			if (data[i].retweet_count > 0){
				tot_retweeted += 1;
			}

			if (data[i].in_reply_to_status_id != null){		// SBAGLIATO, bisognerbbe interrogare
				tot_reply += 1;								// l'api per ogni post
			}

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

		}

		return { 'favorited':tot_favorited, 'retweeted':tot_retweeted, 'replyed':tot_reply,
				'photo':tot_photo, 'video':tot_video, 'mixed':tot_mixed, 'link':tot_link, 
				'text':tot_text, 'tot_posts':tot_posts
				}
	}


}