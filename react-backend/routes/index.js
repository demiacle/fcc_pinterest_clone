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
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin );
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}, passport.authenticate('twitter') );
router.get('/twitterCallback', 
  (req, res, next) => {
    console.log('calling twitter callback')
    next();
  },
  passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => {
    res.send('success');
  }
)
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ logout: true })
})
router.get('/error', (req,res) =>{
  res.send('You have encountered an error');
})


module.exports = router;
