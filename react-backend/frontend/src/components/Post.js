import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import './Post.css';

class Post extends Component {
  constructor(props) {
    super(props)
    this.toggleVote = this.toggleVote.bind(this)
    console.log('post props are')
    console.log(props)
    this.state = {
      hasUserVoted: props.postData.hasUserVoted,
      votes: props.postData.thumbsUp
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn === false) {
      this.setState({ hasUserVoted: false })
    }
  }
  setDefaultPortrait(e) {
    e.target.src = "http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
  }
  setDefaultImage(e) {
    e.target.src = "/broken-link.png"
  }
  toggleVote(e) {
    if (this.props.isLoggedIn === false) {
      alert('You must be logged in to vote')
      return;
    }
    this.setState((prev) => {
      console.log(prev)
      return {
        hasUserVoted: !prev.hasUserVoted,
        votes: prev.hasUserVoted ? prev.votes - 1 : prev.votes + 1
      }
    })
    fetch('/vote/' + this.props.postData._id, { credentials: 'include' })
      .catch(err => alert('An error occured please refresh'))
  }

  render() {
    var i = this.props.postData
    return <li className="grid-item">
      <a href={i.link}>
        <img src={i.link} alt={i.caption} onError={this.setDefaultImage} />
      </a>
      <div className="postHeader">
        <a href={"/posts-by/" + i.user.userName} className="portrait-name-container">
          <div className="user-portrait">
            <img src={i.user.profileUrl} alt="user portrait" onError={this.setDefaultPortrait} />
          </div>
          <p className="user-name">{i.user.userName}</p>
        </a>
        <button className="vote-button" onClick={this.toggleVote} data-tip="Log in in to vote">
          {!this.props.isLoggedIn && <ReactTooltip place="top" type="info" effect="solid" />}
          <span className="vote"><img src={this.state.hasUserVoted ? "/three-arrow-voted.png" : "/three-arrow.png"} alt="vote" />{this.state.votes}</span>
        </button>
      </div>
      <p className="caption">{i.caption}</p>
    </li>
  }
}

export default Post;