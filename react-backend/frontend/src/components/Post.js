import React, { Component } from 'react';
import './Post.css';

class Post extends Component {
  //TODO fetch vote

  //TODO fetch posts by user
  setDefaultPortrait(e){
    e.target.src = "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
  }
  setDefaultImage(e){
    e.target.src = "broken-link.png"
  }

  render() {
    var i = this.props.postData
    return <li className="grid-item">
      <a href={i.link}>
        <img src={i.link} alt={i.caption} onError={this.setDefaultImage}/>
      </a>
      <div className="postHeader">
        <a href={"/posts-by/" + i.user}>
          <div className="portrait-name-container">
            <div className="user-portrait">
              <img src={i.user.profileUrl} alt="user portrait" onError={this.setDefaultPortrait} />
            </div>
            <p className="userName">{i.user.userName}</p>
          </div>
        </a>
        <a href={"/vote/" + i._id}>
          <span className="likes"><img src="three-arrow.png" alt="vote" />{i.thumbsUp}</span>
        </a>
      </div>
      <p className="caption">{i.caption}</p>
    </li>
  }
}

export default Post;