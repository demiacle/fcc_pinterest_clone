import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import Post from './Post';
import UploadForm from './UploadForm';
import Masonry from 'react-masonry-component'

var masonryOptions = {
  transitionDuration: 600,
  columnWidth: 320,
  gutter: 10,
  fitWidth: true
}

class App extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.showUploadForm = this.showUploadForm.bind(this)
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
    var route = '/user-data'
    var splitLocation = window.location.href.split('/');
    if ( splitLocation.includes( 'posts-by' ) ) {
      var position = splitLocation.indexOf('posts-by')
      route = '/api/posts-by/' + splitLocation[ position + 1];
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
    // No need to force reload
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
  renderWall() {
    //console.log('all posts')
    //console.log(this.state.allPosts)
    var elements = this.state.allPosts;
    var childElements = elements.map((i, index) => {
      return <Post postData={i} key={i._id} isLoggedIn={this.state.isLoggedIn} removeFromWall={this.removeFromWall} currentUser={this.state.userName} />
    });
    return childElements;
  }
  addPost(post) {
    this.setState(prev => {
      var allPosts = prev.allPosts.slice()
      allPosts.unshift(post)
      return {
        allPosts
      }
    })
    window.location.replace("https://fcc-pinterest-clone-demiacle.herokuapp.com/")
    this.forceUpdate();
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
          login={this.login}
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