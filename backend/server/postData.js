var mongoose = require('mongoose')
var http = require('http')
var models = require('./models.js')
var postModel = models.postModel
var userModel = models.userModel

exports.addPost = (url, user, caption) => {
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
    post.save((err, doc) => {
      if (err) {
        console.log(err)
        throw 'An unexpected error happened'
      }
      postModel.populate(doc, { path: 'user' }, (err, final) => {
        if(err){
          console.log(err)
        }
        doc = doc.toObject();
        doc.thumbsUp = 0;
        doc.hasUserVoted = false;
        resolve(doc);
      })
    })
  })
}
exports.getPostsByTwitterUserName = (twitterUserName, currentUser) => {
  return new Promise((resolve, reject) => {
    userModel.find({ userName: { $regex: new RegExp(twitterUserName, 'i') } }, (err, user) => {
      if (err)
        console.log(err)
      resolve(user)
    })
  }).then((user) => getPosts({ user: user }, currentUser))
}
exports.getPostsByTwitterId = (twitterId, currentUser) => {
  console.log('not implemented');
}
exports.getPostsByMongooseId = (currentUser) => {
  return getPosts({ user: currentUser }, currentUser)
}
exports.getAllPosts = (currentUser) => {
  return getPosts({}, currentUser)
}
exports.deletePost = (postId, currentUserId) => {
  return new Promise((resolve, reject) => {
    postModel.remove({ _id: postId, user: currentUserId }, (err, post) => {
      if (err)
        console.log(err)

      resolve({ success: true })
    })
  })
}

function getPosts(query, userId) {
  return new Promise((resolve, reject) => {
    postModel.find(query).populate('user').lean().exec((err, posts) => {
      if (err)
        console.log(err)
      // Check if user voted and convert array of voters to a number
      for (var i = 0; i < posts.length; i++) {
        if (posts[i].thumbsUp.includes(userId)) {
          posts[i].hasUserVoted = true;
        } else {
          posts[i].hasUserVoted = false;
        }
        posts[i].thumbsUp = posts[i].thumbsUp.length;
      }
      posts.sort((a, b) => b.dateEpoch - a.dateEpoch)
      resolve(posts);
    })
  })
}