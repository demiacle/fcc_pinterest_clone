import React, { Component } from 'react';
import './Post.css';

class Post extends Component {
  render(){
      var i = this.props.postData
      return <li className="grid-item">
          <a href={i.link}>
            <img src={i.link} alt={i.caption} />
            <div>
              <div className="userPortrait">
                <img src="https://twitter.com/PUBGpartners/profile_image?size=normal" alt="user portrait" />
              </div>
              likes:<span>{i.thumbsUp}</span></div>
            <p className="caption">{i.caption}</p>
          </a>
        </li>
  }
}

export default Post;