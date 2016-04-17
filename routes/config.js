var express = require('express');
var router = express.Router();
var ipaddr = require('ipaddr.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(res.socket.address());
  // console.log(ipaddr.parse(res.socket.address().address));
   res.send(res.socket.address().address);
});


module.exports = router;
