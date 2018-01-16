var passport = require('passport')
var TwitterStrategy = require('passport-twitter')
var mongoose = require('mongoose')

var User = new mongoose.Schema({
  twitterId: String
})

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: "http://127.0.0.1:3001/"
},
  function (token, tokenSecret, profile, cb) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

function redirectToForm() {
  passport.authenticate('twitter');
}

module.exports = redirectToForm;