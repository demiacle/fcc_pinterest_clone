var mongoose = require('mongoose')
var http = require('http')
var postModel = require('./models.js').postModel

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
      caption: caption,
      dateEpoch: (new Date).getTime()
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
    postModel.find({ userName: user._id }).populate('user').lean().exec( (err, posts)=>{
      for( var i = 0; i < posts.length; i++ ) {
        posts[i].thumbsUp = posts[i].thumbsUp.length;
      }
      console.log( posts)
      posts.sort((a,b)=>b.dateEpoch - a.dateEpoch)
      console.log( posts)
      resolve( posts );
    })
  })
}
exports.getAllLinks = () => {
  return new Promise((resolve, reject) => {
    postModel.find({}).populate('user').lean().exec((err, posts)=>{
      for( var i = 0; i < posts.length; i++ ) {
        posts[i].thumbsUp = posts[i].thumbsUp.length;
      }
      posts.sort((a,b)=>b.dateEpoch - a.dateEpoch)
      resolve( posts );
    })
  })
}