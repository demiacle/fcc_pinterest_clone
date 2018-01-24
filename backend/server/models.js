var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  link: String,
  caption: String,
  thumbsUp: [ String ],
  dateEpoch: Number 
})
var postModel = mongoose.model('post', postSchema )

var userSchema = new mongoose.Schema({
  twitterId: String,
  userName: String,
  profileUrl: String
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

module.exports = {
    postModel,
    userModel
}