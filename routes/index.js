var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

var filePath = path.join(__dirname, '/../public/js/_app.js');

var pam = require('authenticate-pam');

var jwt = require('jsonwebtoken');



/* GET home page. */
//altering app.js to reflect local ip adress
router.get('/js/app.js', function(req, res, next) {
	//res.render('index', { title: 'Express' });
	fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
		if (!err){
			res.send(data.replace('__IPADDR__',res.socket.address().address));
		}else{
			console.log(err);
		}

	});
});
/*
router.post('/authenticate', function(req, res, next) {
  pam.authenticate(req.body.user, req.body.password, function(err) {
	if(err) {
		console.log(err);
		res.status('403');
	}
	else {
		var token = jwt.sign({ user: req.body.user }, 'shhhhhaaaaaaaaaaredkey');
		console.log("Authenticated! "+ token);
		res.set('token',token);
		res.status('200');
	}
	res.send('{}');
  });
});
*/
module.exports = router;
