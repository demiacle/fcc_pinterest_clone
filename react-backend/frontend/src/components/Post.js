import React, { Component } from 'react';
import './Post.css';

class Post extends Component {
  constructor(props){
    super(props)
    this.toggleVote = this.toggleVote.bind(this)

  }
  //TODO fetch vote

  //TODO fetch posts by user
  setDefaultPortrait(e){
    e.target.src = "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
  }
  setDefaultImage(e){
    e.target.src = "broken-link.png"
  }

  toggleVote(e){
    e.preventDefault()
    this.props.toggleVoteStatus()
    fetch('/vote/'+ this.props.postData._id, {credentials: 'include'})
      .then(res => res.json() )
      .then( res => this.setState( { 
      } ) )
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
        <a href="vote" onClick={this.toggleVote}>
          <span className="likes"><img src="three-arrow.png" alt="vote" />{i.thumbsUp}</span>
        </a>
      </div>
      <p className="caption">{i.caption}</p>
    </li>
  }
}

export default Post;