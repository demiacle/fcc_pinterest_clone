var passport = require('passport')
var TwitterStrategy = require('passport-twitter')
var mongoose = require('mongoose')

var User = new mongoose.Schema({
  twitterId: String
})

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: "localhost:3001/twitterCallback"
},
  function (token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));