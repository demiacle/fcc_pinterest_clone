var express = require('express');
var router = express.Router();
require('../server/twitterAuth.js')
var linkData = require('../server/linkData.js')
var poll = require('../server/poll.js')
var passport = require('passport')

function requireLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(403).json({ error: "You must be logged in to do that" });
  }
}

router.get('/login', (req, res, next) => {
  // Keep now for debugging purposes
  console.log(req.sessionID)
  next();
  },
  passport.authenticate('twitter'));
router.get('/twitterCallback', (req, res, next) => {
  // Keep now for debugging purposes
  console.log(req.sessionID)
  next();
  },
  passport.authenticate('twitter', {
    failureRedirect: '/error',
    successRedirect: process.env.FRONTEND_URL
  })
)
router.get('/user-data', async (req, res) => {
  var isLoggedIn = req.user ? true : false;
  var posts = await linkData.getAllLinks();
  res.json({ isLoggedIn, posts });
})
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ isLoggedIn: false })
})
router.get('/error', (req, res) => {
  res.send('You have encountered a perplexing error');
})
router.post('/create-link', requireLoggedIn, (req, res) => {
  linkData.addLink(req.body.link, req.user, req.body.caption)
    .then((post) => res.json({ post }))
    .catch((e) => {
      res.status(400).json({ error: e })
    })
})
router.get('/my-pics', requireLoggedIn, (req, res) => {
  linkData.getUserLinks(req.user._id)
    .then((posts) => {
      res.json({ posts })
    })
    .catch(() => res.redirect('/error'))
})
router.get('/vote/:postId', requireLoggedIn, async (req, res) => {
  var status = await poll.toggleVote(req.params.postId, req.user._id);
  res.json(status)
})
router.get('/posts-by/:twitterId', (req, res) => {
  linkData.getUserLinks(req.params.twitterId)
    .then((post) => {
      res.json({ posts })
    })
    .catch(() => res.redirect('/error'))
})

module.exports = router;
