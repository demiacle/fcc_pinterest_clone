var mongoose = require('mongoose')
var http = require('http')

var postSchema = new mongoose.Schema({
  user: String,
  link: String,
  caption: String,
  thumbsUp: [ String ] 
})
var postModel = mongoose.model('post', postSchema )

exports.addLink = (url, user, caption) => {
  return new Promise((resolve, reject) => {
    url = encodeURI(url)
    url = url.replace('https', 'http')
    var prefix = 'http://';
    if (url.substr(0, prefix.length) !== prefix) {
      url = prefix + url;
    }
    var post = new postModel({
      user: user._id,
      link: url,
      caption: caption
    })
    post.save((err, doc)=>{
      if(err){
        console.log(err)
        throw 'An unexpected error happened'
      }
        resolve(doc.toObject());
    })
  })
}
exports.getUserLinks = (user) => {
  return new Promise((resolve, reject) => {
    postModel.find({ user: user._id }).lean().exec( (err, posts)=>{
      for( var i = 0; i < posts.length; i++ ) {
        posts[i].thumbsUp = posts[i].thumbsUp.length;
      }
      resolve( posts );
    })
  })
}
exports.getAllLinks = () => {
  return new Promise((resolve, reject) => {
    postModel.find({}).lean().exec((err, posts)=>{
      for( var i = 0; i < posts.length; i++ ) {
        posts[i].thumbsUp = posts[i].thumbsUp.length;
      }
      resolve( posts );
    })
  })
}