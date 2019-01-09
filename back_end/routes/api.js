var express = require('express');
var router = express.Router();

var config = require ('../config');

var Twit = require ('twit');
var T = new Twit (config.api_twitter);

// https://apigee.com/console

/////////////////////////////////////////////////////////////////////////////////////
// METRICA 1

router.get('/tweet_type', function(req, res, next) {

	var nome = req.query.nome;

	if (typeof nome == 'undefined' || nome == null){
		res.send( JSON.stringify({error:1, 'data':'nome non fornito'}) + '\n' );

	} else {

		var m = require ('../metriche/1_tweet_type');

		m.calcola (T, nome, function(err, data) {
			if (err) {									// In caso di errore
				var msg = ""
				if ( "message" in err )
					msg = err.message;

				console.error(err);
				res.send( JSON.stringify({'error':2, 'data':'Errore nel callback della metrica: ' + msg}) + '\n' )
			} else if  (data == null) {
				res.send( JSON.stringify({'error':3, 'data':'data non contiene informazioni'}) + '\n' )
			} else {
				res.send( JSON.stringify({'error':0, 'data':data}) + '\n' );
			}
		});
	}

});

// curl http://127.0.0.1:8000/tweet_type
// curl http://127.0.0.1:8000/tweet_type?nome=SNitopi


/////////////////////////////////////////////////////////////////////////////////////
// METRICA 2

router.get('/tweet_riscontro', function(req, res, next) {

	var nome = req.query.nome;

	if (typeof nome == 'undefined' || nome == null){
		res.send( JSON.stringify({error:1, 'data':'nome non fornito'}) + '\n' );

	} else {

		var m = require ('../metriche/2_tweet_riscontro');

		m.calcola (T, nome, function(err, data) {
			if (err) {									// In caso di errore
				var msg = ""
				if ( "message" in err )
					msg = err.message;

				console.error(err);
				res.send( JSON.stringify({'error':2, 'data':'Errore nel callback della metrica: ' + msg}) + '\n' )
			} else if  (data == null) {
				res.send( JSON.stringify({'error':3, 'data':'data non contiene informazioni'}) + '\n' )
			} else {
				res.send( JSON.stringify({'error':0, 'data':data}) + '\n' );
			}
		});
	}

});

// curl http://127.0.0.1:8000/tweet_riscontro
// curl http://127.0.0.1:8000/tweet_riscontro?nome=SNitopi

/////////////////////////////////////////////////////////////////////////////////////
// METRICA 3

router.get('/media_temporale', function(req, res, next) {

	var nome = req.query.nome;

	if (typeof nome == 'undefined' || nome == null){
		res.send( JSON.stringify({error:1, 'data':'nome non fornito'}) + '\n' );

	} else {

		var m = require ('../metriche/3_media_temporale_tweets');

		m.calcola (T, nome, function(err, data) {
			if (err) {									// In caso di errore
				var msg = ""
				if ( "message" in err )
					msg = err.message;

				console.error(err);
				res.send( JSON.stringify({'error':2, 'data':'Errore nel callback della metrica: ' + msg}) + '\n' )
			} else if  (data == null) {
				res.send( JSON.stringify({'error':3, 'data':'data non contiene informazioni'}) + '\n' )
			} else {
				res.send( JSON.stringify({'error':0, 'data':data}) + '\n' );
			}
		});
	}

});

// curl http://127.0.0.1:8000/media_temporale?nome=SNitopi


/////////////////////////////////////////////////////////////////////////////////////
// METRICA 4

router.get('/media_retweet', function(req, res, next) {

	var nome = req.query.nome;

	if (typeof nome == 'undefined' || nome == null){
		res.send( JSON.stringify({error:1, 'data':'nome non fornito'}) + '\n' );

	} else {

		var m = require ('../metriche/4_media_retweets');

		m.calcola (T, nome, function(err, data) {
			if (err) {									// In caso di errore
				var msg = ""
				if ( "message" in err )
					msg = err.message;

				console.error(err);
				res.send( JSON.stringify({'error':2, 'data':'Errore nel callback della metrica: ' + msg}) + '\n' )
			} else if  (data == null) {
				res.send( JSON.stringify({'error':3, 'data':'data non contiene informazioni'}) + '\n' )
			} else {
				res.send( JSON.stringify({'error':0, 'data':data}) + '\n' );
			}
		});
	}

});

// curl http://127.0.0.1:8000/retweet?nome=SNitopi

/////////////////////////////////////////////////////////////////////////////////////
// METRICA 5

router.get('/media_mentions', function(req, res, next) {

	var nome = req.query.nome;

	if (typeof nome == 'undefined' || nome == null){
		res.send( JSON.stringify({error:1, 'data':'nome non fornito'}) + '\n' );

	} else {

		var m = require ('../metriche/5_media_mentions');

		m.calcola (T, nome, function(err, data) {
			if (err) {									// In caso di errore
				var msg = ""
				if ( "message" in err )
					msg = err.message;

				console.error(err);
				res.send( JSON.stringify({'error':2, 'data':'Errore nel callback della metrica: ' + msg}) + '\n' )
			} else if  (data == null) {
				res.send( JSON.stringify({'error':3, 'data':'data non contiene informazioni'}) + '\n' )
			} else {
				res.send( JSON.stringify({'error':0, 'data':data}) + '\n' );
			}
		});
	}

});

// curl http://127.0.0.1:8000/media_mentions?nome=SNitopi

/*/////////////////////////////////////////////////////////////////////////////////////
// METRICA 6 GET 	(NON va bene perchè la lista è limitata alla lunghezza max dell'URL)

router.get('/lista_mentions', function(req, res, next) {

	var raw_nomi = req.query.nomi;

	if (typeof raw_nomi == 'undefined' || raw_nomi == null){
		res.send( JSON.stringify({error:1, 'data':'raw_nomi non fornito'}) + '\n' );

	} else if (raw_nomi.replace(/\s/g,'').split(',').length < 2) {
		res.send( JSON.stringify({error:4, 'data':'numero di nomi fornito insufficiente'}) + '\n' );

	} else {

		var nomi = raw_nomi.replace(/\s/g,'').split(',');		// Rimuovo gli spazi e splitto per ,

		var m = require ('../metriche/6_lista_mentions');
		m.calcola (T, nomi, function(err, data) {
			if (err) {									// In caso di errore
				var msg = ""
				if ( "message" in err )
					msg = err.message;

				console.error(err);
				res.send( JSON.stringify({'error':2, 'data':'Errore nel callback della metrica: ' + msg}) + '\n' )
			} else if  (data == null) {
				res.send( JSON.stringify({'error':3, 'data':'data non contiene informazioni'}) + '\n' )
			} else {
				res.send( JSON.stringify({'error':0, 'data':data}) + '\n' );
			}
		});
	}

	// curl http://127.0.0.1:8000/lista_mentions?nomi=SNitopi,marco125_

});

*//////////////////////////////////////////////////////////////////////////////////////
// METRICA 6 POST

router.post('/lista_mentions', function(req, res, next) {

	var raw_nomi = req.body.nomi;
	
	if (typeof raw_nomi == 'undefined' || raw_nomi == null){
		res.send(JSON.stringify({error:1, data:'nomi non fornito'}));

	} else {

		var candidate_nomi = raw_nomi.replace(/\s/g,'').split(',');
		var nomi = [];

		for (i=0; i<candidate_nomi.length; i++){
			if (candidate_nomi[i].length > 1){
				nomi.push (candidate_nomi[i]);
			}
		}

	 	if (nomi.length < 2) {
			res.send( JSON.stringify({error:4, 'data':'numero di nomi fornito insufficiente'}) + '\n' );
			console.log("LOL");

		} else {

			var m = require ('../metriche/6_lista_mentions');
			m.calcola (T, nomi, function(err, data) {
				if (err) {									// In caso di errore
					var msg = ""
					if ( "message" in err )
						msg = err.message;

					console.error(err);
					res.send( JSON.stringify({'error':2, 'data':'Errore nel callback della metrica: ' + msg}) + '\n' )
				} else if  (data == null) {
					res.send( JSON.stringify({'error':3, 'data':'data non contiene informazioni'}) + '\n' )
				} else {
					res.send( JSON.stringify({'error':0, 'data':data}) + '\n' );
				}
			});

		}

	}
	
	// curl --data 'nomi=SNitopi,marco125_' http://127.0.0.1:8000/lista_mentions

});

/////////////////////////////////////////////////////////////////////////////////////
// METRICA 7 POST 	(Tutte le metriche insieme)

router.post('/metrica_mix', function(req, res, next) {

	var raw_nomi = req.body.nomi;
	
	if (typeof raw_nomi == 'undefined' || raw_nomi == null){
		res.send(JSON.stringify({error:1, data:'nomi non fornito'}));

	} else {

		var candidate_nomi = raw_nomi.replace(/\s/g,'').split(',');
		var nomi = [];

		for (i=0; i<candidate_nomi.length; i++){
			if (candidate_nomi[i].length > 1){
				nomi.push (candidate_nomi[i]);
			}
		}

	 	if (nomi.length < 2) {
			res.send( JSON.stringify({error:4, 'data':'numero di nomi fornito insufficiente'}) + '\n' );
			console.log("LOL");

		} else {

			var m = require ('../metriche/7_metrica_mix');
			m.calcola (T, nomi, function(err, data) {
				if (err) {									// In caso di errore
					var msg = ""
					if ( "message" in err )
						msg = err.message;

					console.error(err);
					res.send( JSON.stringify({'error':2, 'data':'Errore nel callback della metrica: ' + msg}) + '\n' )
				} else if  (data == null) {
					res.send( JSON.stringify({'error':3, 'data':'data non contiene informazioni'}) + '\n' )
				} else {
					res.send( JSON.stringify({'error':0, 'data':data}) + '\n' );
				}
			});

		}

	}
	
	// curl --data 'nomi=SNitopi,marco125_' http://127.0.0.1:8000/metrica_mix

});

module.exports = router;



