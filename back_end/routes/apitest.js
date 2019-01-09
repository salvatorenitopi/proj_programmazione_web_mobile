var express = require('express');
var router = express.Router();

var Twit = require ('twit');
var config = require ('../public/javascripts/config');

var T = new Twit (config.api_twitter);

router.get('/', function(req, res, next) {

	/*T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
		res.send(data);
	});*/

	res.send('GET REQ!');

});

router.post('/', function(req, res, next) {

	var userid = req.body.userid;
	var mode = req.body.mode;

	console.log(userid)

	if (typeof userid == 'undefined' || userid == null){
		res.send(JSON.stringify({error:1, data:"userid not provided"}));
	
	} else if (typeof mode == 'undefined' || mode == null) {
		res.send(JSON.stringify({error:1, data:"mode not provided"}));

	} else {
		var r = JSON.stringify({error:0, data:{"userid":userid, "mode":mode}})
		res.send(r);

	}


});

module.exports = router;


// curl --data "userid=value1&mode=value2" http://127.0.0.1:8000/apitest