var express = require('express');
var router = express.Router();
var passportRequest = require('../server/twitterAuth.js')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req,res,next)=>{
  passportRequest.redirectToForm();
})


module.exports = router;
