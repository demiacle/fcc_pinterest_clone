var express = require('express');
var router = express.Router();
var login = require('../server/twitterAuth.js')
var passport = require('passport')

router.get('/', function(req, res, next) {
  console.log( req.session.id)
  res.send('yip');
  login();
});

router.get('/login', (req,res,next) =>{
  console.log( req.session.id)
  //res.header('Access-Control-Allow-Credentials', true);
  //res.header('Access-Control-Allow-Origin', req.headers.origin );
  //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}, passport.authenticate('twitter') );
router.get('/twitterCallback', 
  passport.authenticate('twitter', { 
    failureRedirect: '/error', 
    successRedirect: process.env.FRONTEND_URL 
  })
)
router.get('/userData', (req,res)=>{
  console.log( req.session.id)
  var isLoggedIn = req.user ? true : false;
  res.json({ isLoggedIn });
})
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ logout: true })
})
router.get('/error', (req,res) =>{
  res.send('You have encountered a perplexing error');
})
router.get('/upload', (req,res)=>{
  res.send('upload')
})
router.get('/myPics', (req,res)=>{
  res.send('mypics')
})

module.exports = router;
