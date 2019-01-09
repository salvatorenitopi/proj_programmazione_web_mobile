var config = require ('../config');

var Twit = require ('twit');
var T = new Twit (config.api_twitter);




// media degli intervalli temporali tra i tweet postati
/*
T.get('statuses/user_timeline', { screen_name: 'realDonaldTrump', count: 200 }, function(err, data, response) {
	
	var tempi = [];

	for (var i = 0; i < data.length; i++) {
		var d = new Date(data[i].created_at);			// Timestamp in millisecondi
		tempi.push(d.getTime());
	};	


	var medie = [];

	for (var i = 0; i < tempi.length - 1; i++) {
		medie.push(( (tempi[i] - tempi[i + 1]) / 1000 / 60));
	};

	//var totale = 0;
	//for (var i = 0; i < tempi.length - 1; i++) {
	//	totale += (tempi[i] - tempi[i + 1]);
	//};	
	//var media = (totale / data.length) / 1000 / 60;		// Media in minuti

	var out = { data:JSON.stringify(medie), lol:'lolla'};
	console.log( out.data );

});*/



// CLASSIFICAZIONE	(INCOMPLETA)
/*T.get('statuses/user_timeline', { screen_name: 'SNitopi', count: 200 }, function(err, data, response) {

	for (var i = 0; i < data.length; i++) {				// MEDIA ( img, video )
		console.log (data[i].extended_entities)
	}

	/*for (var i = 0; i < data.length; i++) {				// MEDIA ( img, video )
		for (var j = 0; j < data[i].extended_entities.lenght; j++) {
			console.log (data[i].extended_entities[j])
		}
	}

});
/*

// media dei retweet tra i tweet postati

T.get('statuses/user_timeline', { screen_name: 'realDonaldTrump', count: 200 }, function(err, data, response) {

	var retweet = [];

	for (var i = 0; i < data.length; i++) {
		retweet.push(data[i].retweet_count);
	}

	var out = { data:JSON.stringify(retweet) };
	console.log( out.data );
});



// media delle mention tra i tweet postati

T.get('statuses/user_timeline', { screen_name: 'realDonaldTrump', count: 200 }, function(err, data, response) {

	var mentions = [];

	for (var i = 0; i < data.length; i++) {
		mentions.push(data[i].entities.user_mentions.length);
	}

	var out = { data:JSON.stringify(mentions) };
	console.log( out.data );

});
*/

/*

T.get('search/tweets', { q: 'from:realDonaldTrump @EdWGillespie', count: 100 }, function(err, data, response) {

	console.log(data.statuses[0]);

	//for (var i = 0; i < data.statuses.length; i++) {
	//	console.log(data.statuses[i]);
	//}
	

});

*/

/*
var nomi = ["a", "b"]

var promises = [];
var out = [];
for (var i = 0; i < nomi.length; i++) {							// Scorre utente form:

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

		console.log(query)
		console.log(arr)
		console.log(nomi[i])

}

*/

/*
// Get follower count
T.get('statuses/user_timeline', { screen_name: "realDonaldTrump", count: 1 }, function(err, data, response) {
	console.log("FOLLOWERS_COUNT: " + data[0].user.followers_count);
});

// Get post count
T.get('statuses/user_timeline', { screen_name: "SNitopi", count: 1 }, function(err, data, response) {
	console.log("POST_COUNT: " + data[0].user.statuses_count);
});
*/

/*
var query = "from:realdonaldtrump since:2017-11-14"

T.get('search/tweets', { q: query, count: 200 }, function(err, data, response) {
	console.log(data);
	console.log(data.statuses.length);
});
*/




/*
///////////////////////////////////////////////////////////////////////////
// Problema chiamate multiple

T.get("statuses/user_timeline", { screen_name: "realDonaldTrump", count: 200}, function(err, data1, response) {

  // Get the id of the last tweet
  var first_id1 = data1[0].id;
  var last_id1 = data1[data1.length-1].id;

  console.log(data1[0].text);
  console.log (first_id1 + " : " + last_id1);

  // Submit another request using the last_id
  T.get("statuses/user_timeline", { screen_name: "realDonaldTrump", count: 200, last_id: last_id1}, function(err, data2, response) {
      
      var first_id2 = data2[0].id;
      var last_id2 = data2[data2.length-1].id;

	  console.log(data2[0].text);
	  console.log (first_id2 + " : " + last_id2);
  })
})


T.get("statuses/user_timeline", { screen_name: "realDonaldTrump", count: 200, last_id: "923546192511946800"}, function(err, data, response) {
	console.log(data[0].text);
})

///////////////////////////////////////////////////////////////////////////
*/

/*
T.get("statuses/user_timeline", {screen_name: "realDonaldTrump", count: 200}, function(err, data, response) {
  console.log(data[0].text); // Whatever you want to do here

  // Get the id of the last tweet
  var last_id = data[data.length-1].id_str;

  // Submit another request using the last_id
  T.get("statuses/user_timeline", {screen_name: "realDonaldTrump", count: 200, max_id:last_id}, function(err, data, response) {
      console.log(data[0].text); // Whatever you want to do here
  })
})

// https://stackoverflow.com/questions/27322994/nodejs-q-chaining-promises-sequentially

function asyncFunc(e) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(e), e * 1000);
  });
}

const arr = [1, 2, 3];
let final = [];

function workMyCollection(arr) {
  return arr.reduce((promise, item) => {
    return promise
      .then((result) => {
        console.log(`item ${item}`);
        return asyncFunc(item).then(result => final.push(result));
      })
      .catch(console.error);
  }, Promise.resolve());
}

workMyCollection(arr)
  .then(() => console.log(`FINAL RESULT is ${final}`));
*/

var a = require ('./0_metriche_mix');

a.media_temporale();


