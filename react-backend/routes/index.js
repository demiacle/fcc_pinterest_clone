var express = require('express');
var router = express.Router();
require('../server/twitterAuth.js')
var postData = require('../server/postData.js')
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
  var userName = req.user ? req.user.userName : '';
  var posts = await postData.getAllPosts( req.user && req.user._id );
  res.json({ isLoggedIn, userName, posts });
})
router.get('/posts-by/:twitterUserName', async (req, res) => {
  var isLoggedIn = req.user ? true : false;
  var userName = req.user ? req.user.userName : '';
  var posts = await postData.getPostsByTwitterUserName(req.params.twitterUserName, req.user && req.user._id )
  res.json({ isLoggedIn, userName, posts });
})
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ isLoggedIn: false })
})
router.get('/error', (req, res) => {
  res.send('You have encountered a perplexing error');
})

// Login required routes
router.post('/create-link', requireLoggedIn, (req, res) => {
  postData.addPost(req.body.link, req.user, req.body.caption)
    .then((post) => res.json({ post }))
    .catch((e) => {
      res.status(400).json({ error: e })
    })
})
// Deprecated my-pics
router.get('/my-pics', requireLoggedIn, (req, res) => {
  postData.getPostsByMongooseId(req.user._id)
    .then((posts) => {
      res.json({ posts })
    })
    .catch(() => res.redirect('/error'))
})
router.get('/vote/:postId', requireLoggedIn, async (req, res) => {
  var status = await poll.toggleVote(req.params.postId, req.user._id);
  res.json(status)
})
router.get('/delete-post/:postId', requireLoggedIn, async (req, res) => {
  var status = await postData.deletePost(req.params.postId, req.user._id);
  res.json(status)
})

module.exports = router;