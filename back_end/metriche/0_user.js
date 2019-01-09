module.exports = {

	get_info: function (data){

		var user_img = ""
		var screen_name = ""
		var name = ""
		var statuses_count = ""
		var followers_count = ""

		if ( "user" in data[0]){
			if ( "profile_image_url_https" in data[0].user)
			user_img = data[0].user.profile_image_url_https.replace("normal", "400x400");

			if ( "screen_name" in data[0].user)
			screen_name = data[0].user.screen_name;

			if ( "name" in data[0].user)
			name = data[0].user.name;

			if ( "statuses_count" in data[0].user)
			statuses_count = data[0].user.statuses_count;

			if ( "followers_count" in data[0].user)
			followers_count = data[0].user.followers_count;
		}
		

		return { 'user_img':user_img, 'screen_name':screen_name, 'name':name,
				'statuses_count':statuses_count, 'followers_count':followers_count,
				
				}
	}


}