var passport = require('passport')
var TwitterStrategy = require('passport-twitter')
var LocalStrategy = require('passport-local')
var mongoose = require('mongoose')
var userModel = require('./models.js').userModel

passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: process.env.BACKEND_URL + "twitterCallback"
},
  function (token, tokenSecret, profile, cb) {
    userModel.findOneOrCreate({ twitterId: profile.id, userName: profile.username }, function (err, user) {
      // Update user profile link on every login
      if (user.profileUrl !== profile._json.profile_image_url) {
        user.profileUrl = profile._json.profile_image_url
      }
      user.save((err, updatedUser) => {
        return cb(err, updatedUser)
      })
    });
  }
));

passport.use(new LocalStrategy({ session: true }, function (user, password, done) {
  userModel.findOneOrCreate({ twitterId: '@Guest', userName: '@Guest' }, function (err, user) {
    if (err) {
      return done(err)
    }
    done(null, user)
  })
}))