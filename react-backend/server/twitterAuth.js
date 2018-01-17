var passport = require('passport')
var TwitterStrategy = require('passport-twitter')
var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  twitterId: String
})
userSchema.statics.findOneOrCreate = function findOneOrCreate( condition, callback){
  var self = this;
  self.findOne(condition,(err,result)=>{
    return result ? callback(err,result)
    : self.create(condition, (err, result) =>{ 
      return callback(err,result)
    })
  })
}
var userModel = mongoose.model('user', userSchema )
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET,
  callbackURL: "http://98.210.186.7:3001/twitterCallback"
},
  function (token, tokenSecret, profile, cb) {
    userModel.findOneOrCreate({ twitterId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

function test(){
    userModel.findOneOrCreate({ twitterId: 't' }, function (err, user) {
      console.log('user');
    });
}

module.exports = test;