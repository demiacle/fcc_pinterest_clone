var mongoose = require('mongoose')
var postModel = require('./models.js').postModel

var errorMsg = { error: 'Voting failed' }

function toggleVote(postId, userId) {
  return new Promise((resolve, reject) => {
    postModel.findOne({ _id: postId }, (err, post) => {
      if( err ){
        resolve( errorMsg )
      }

      if (post.thumbsUp.includes(userId)) {
        post.thumbsUp.splice(post.thumbsUp.indexOf(userId), 1)
      } else {
        post.thumbsUp.push(userId)
      }

      post.save(err => {
        if (err) {
          resolve( errorMsg )
        } else {
          resolve({ success: true })
        }
      })
    })
  })
}

module.exports = {
  toggleVote
}
