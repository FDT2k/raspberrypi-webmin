var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, '/../public/js/_app.js');

var pam = require('authenticate-pam');
var config = require('../config');
var jwt = require('jsonwebtoken');



//authenticate against pam
router.post('/authenticate', function(req, res, next) {
	console.log(req);
  pam.authenticate(req.body.username, req.body.password, function(err) {
	if(err) {
	  console.log(err);
	  res.status('403');
	}
	else {
		var token = jwt.sign({ username: req.body.username }, config.JWT_KEY,config.JWT_CONFIG);
		console.log("Authenticated! "+ token);
		res.set('token',token);
		res.status('200');
	}
	res.send('{}');
  });
});


router.get('/daemons',function(req,res,next){
	res.send('{}');
});

module.exports = router;
