var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({
  user: String,
  link: String,
  caption: String,
  thumbsUp: [ String ] 
})
var postModel = mongoose.model('post', postSchema )

function isImg(url) {
  return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}
exports.addLink = (link, user, caption) => {
  return new Promise((resolve, reject) => {
    link = encodeURIComponent(link)
    if (isImg(link) === false) {
      throw 'Error: Link source must be an image format of jpeg, jpg, gif, or png';
    }
    var post = new postModel({
      user: user._id,
      link: link,
      caption: caption
    })
    post.save((err)=>{
      if(err){
        console.log(err)
        throw 'An unexpected error happened'
      }
      resolve();
    })
  })
}

exports.getUserLinks = (user) => {
  return new Promise((resolve, reject) => {
    postModel.find({},(err, posts)=>{

      resolve( posts );
    })
  })
}