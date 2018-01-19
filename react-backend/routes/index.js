var express = require('express');
var router = express.Router();
require('../server/twitterAuth.js')
var linkData = require('../server/linkData.js')
var passport = require('passport')

function requireLoggedIn(req,res,next){
  if( req.user ){
    next();
  } else {
    res.status(403).json( {error:"You must be logged in to do that"});
  }
}

router.get('/login', passport.authenticate('twitter') );
router.get('/twitterCallback', 
  passport.authenticate('twitter', { 
    failureRedirect: '/error', 
    successRedirect: process.env.FRONTEND_URL 
  })
)
router.get('/userData', (req,res)=>{
  var isLoggedIn = req.user ? true : false;
  res.json({ isLoggedIn });
})
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ isLoggedIn: false })
})
router.get('/error', (req,res) =>{
  res.send('You have encountered a perplexing error');
})
router.post('/createLink', requireLoggedIn, (req,res)=>{
  linkData.addLink( req.body.link, req.user, req.body.caption )
    .then( ()=>res.json({ success: true }) )
    .catch( (e)=>{
      res.status(400).json({ error: e})
    } )
})
router.get('/myPics', requireLoggedIn, (req,res)=>{
  linkData.getUserLinks( req.user )
    .then((payload) => {
      res.json({ success: true }) 
    })
    .catch( ()=>res.redirect('/error'))
})

module.exports = router;
