var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  twitterId: String
})

function isImg(url) {
  return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}
exports.addLink = (link, user) => {
  return new Promise((resolve, reject) => {
    link = encodeURIComponent(link)
    if (isImg(link) === false) {
      throw 'Error: Link source must be an image format of jpeg|jpg|gif|png';
    }
    // AFTER DB RESOLVE
    setTimeout(resolve, 1000);
  })
}

exports.getUserLinks = (user) => {

  return new Promise((resolve, reject) => {
    // AFTER DB RESOLVE
    setTimeout(resolve, 1000);
  })
}