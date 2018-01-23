import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import Post from './Post';
import UploadForm from './UploadForm';
import Masonry from 'react-masonry-component'
import { Redirect } from 'react-router'

var masonryOptions = {
  transitionDuration: 600,
  columnWidth: 240,
  gutter: 10,
  fitWidth: true
}

class App extends Component {
  constructor(props) {
    super(props)
    this.test = this.test.bind(this)
    this.logout = this.logout.bind(this)
    this.showUploadForm = this.showUploadForm.bind(this)
    this.viewUserPosts = this.viewUserPosts.bind(this)
    this.addPost = this.addPost.bind(this)
    this.removeFromWall = this.removeFromWall.bind(this)
    this.state = {
      isLoggedIn: false,
      showUploadingForm: false,
      allPosts: []
    }
  }

  // Handles initializing between two separate routes
  componentDidMount() {
    console.log('checking if user is logged in')
    var route = '/user-data'
    if (this.props.match.params.user) {
      route = '/posts-by/' + this.props.match.params.user
    }
    fetch(route, { credentials: 'include' })
      .then(res => res.json())
      .then(res => this.setState({
        isLoggedIn: res.isLoggedIn,
        userName: res.userName,
        allPosts: res.posts ? res.posts : []
      }))
  }
  logout(e) {
    // Does not force reload for super speedy user experience
    e.preventDefault();
    this.setState(prev => {
      function removeUserHasVoted(i) {
        i.hasUserVoted = false
        return i
      }
      var newAllPosts = prev.allPosts.map(removeUserHasVoted)
      return {
        isLoggedIn: false,
        showUploadingForm: false,
        allPosts: newAllPosts,
      }
    });
    fetch('/logout', { credentials: 'include' })
      .catch(err => alert('You encountered an error while logging out.'))
  }
  viewUserPosts(e) {
    // DEPRECATED - REMOVE
    // use this for profile clicks too
    e.preventDefault();
    fetch('/posts-by', { credentials: 'include' })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        if (res.error) {
          alert(res.error)
        } else {
          this.setState({ allPosts: res.posts })
          this.forceUpdate()
        }
      })
  }
  removeFromWall(postId) {
    this.setState(prev => {
      var newAllPosts = prev.allPosts
      newAllPosts = newAllPosts.reduce((accumulator, i) => {
        if (i._id !== postId) {
          accumulator.push(i)
        }
        return accumulator
      },[])
      return { allPosts: newAllPosts }
    })
  }
  showUploadForm(e) {
    this.setState({ showUploadingForm: true });
    e.preventDefault();
  }
  test(e) {
    e.preventDefault();
    console.log(this.state)
  }
  renderWall() {
    console.log('all posts')
    console.log(this.state.allPosts)
    var elements = this.state.allPosts;
    var childElements = elements.map((i, index) => {
      return <Post postData={i} key={index} isLoggedIn={this.state.isLoggedIn} removeFromWall={this.removeFromWall} currentUser={this.state.userName} />
    });
    return childElements;
  }
  addPost(post) {
    if (this.props.match.params.user) {
      return <Redirect to='/' push={true} />
    }
    this.setState(prev => {
      var allPosts = prev.allPosts.slice()
      allPosts.unshift(post)
      return {
        allPosts
      }
    })
    this.forceUpdate()
    setTimeout(() => { console.log(this.state) }, 2000)
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">

        <NavBar
          test={this.test}
          isLoggedIn={this.state.isLoggedIn}
          logout={this.logout}
          showUploadForm={this.showUploadForm}
          userName={this.state.userName}
        />

        <header className="App-header">
          <h1 className="App-title">
            <div className='spin'></div>
            PICPAC
            <div className='spin'></div>
            {this.state.showUploadingForm && <UploadForm addPost={this.addPost} />}
          </h1>
        </header>

        <div id="theWall">
          <p id="builtBy">Built by <a>Daniel Escobedo</a>:<a href="https://twitter.com/Demiacle">@Demiacle</a> using React, Express and masonry.js</p>
          <Masonry elementType={'ul'} options={masonryOptions} >
            {this.renderWall()}
          </Masonry>
        </div>

      </div>
    );
  }
}

export default App;