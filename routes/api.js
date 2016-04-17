var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, '/../public/js/_app.js');

var pam = require('authenticate-pam');

var jwt = require('jsonwebtoken');




router.post('/authenticate', function(req, res, next) {
	console.log(req);
  pam.authenticate(req.body.username, req.body.password, function(err) {
	if(err) {
	  console.log(err);
	  res.status('403');
	}
	else {
		var token = jwt.sign({ username: req.body.username }, 'shhhhhaaaaaaaaaaredkey');
		console.log("Authenticated! "+ token);
		res.set('token',token);
		res.status('200');
	}
	res.send('{}');
  });
});

router.post('/hello', function(req, res, next) {
	res.send('hello');
});

module.exports = router;
