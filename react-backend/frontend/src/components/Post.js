import React, { Component } from 'react';
import './Post.css';

class Post extends Component {
  render() {
    var i = this.props.postData
    return <li className="grid-item">
      <a href={i.link}>
        <img src={i.link} alt={i.caption} />
      </a>
      <div className="postHeader">
        <a href={ "/postsBy/" + i.user }>
        <div className="userPortrait">
          <img src={"https://twitter.com/" + i.user + "/profile_image?size=normal"} alt="user portrait" />
        </div>
        <p className="userName">{i.user}</p>
        </a>
        <a href={"/vote/" + i._id }>
        <span className="likes"><img src="three-arrow.png" />{i.thumbsUp}</span>
        </a>
      </div>
      <p className="caption">{i.caption}</p>
    </li>
  }
}

export default Post;