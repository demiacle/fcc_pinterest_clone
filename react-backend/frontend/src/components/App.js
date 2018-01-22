import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import Post from './Post';
import UploadForm from './UploadForm';
import Masonry from 'react-masonry-component'

var masonryOptions = {
  transitionDuration: 600,
  columnWidth: 240,
  gutter: 10,
  fitWidth: true
}

class App extends Component {
  constructor(props){
    super(props)
    this.test = this.test.bind(this)
    this.logout = this.logout.bind(this)
    this.showUploadForm = this.showUploadForm.bind(this)
    this.viewUserPosts = this.viewUserPosts.bind(this)
    this.addPost = this.addPost.bind(this)
    this.state = {
      isLoggedIn: false,
      showUploadingForm: false,
      isShowingUserPosts: false,
      hasVotedForPosts: [],
      userPosts: [],
      allPosts: []
    }
  }

  toggleVoteStatus(){
    console.log('toggle')
    // if has voted for then revoke
    // other add vote
  }

  // Check if user is logged in
  componentDidMount() {
    console.log('checking if user is logged in')
    fetch('/user-data', {credentials: 'include'})
      .then(res => res.json() )
      .then( res => this.setState( { 
        isLoggedIn: res.isLoggedIn,
        allPosts: res.posts
      } ) )
  }
  // Does not force reload for super speedy user experience
  logout(e){
    e.preventDefault();
    this.setState({ isLoggedIn: false, showUploadingForm: false });
    fetch('/logout', {credentials: 'include'})
      .catch(err=>alert('You encountered an error while logging out.'))
  }
  viewUserPosts(e){
    e.preventDefault();
    fetch('/my-pics', {credentials: 'include'})
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        if( res.error ){
          alert( res.error )
        } else {
          this.setState({userPosts:res.posts, isShowingUserPosts: true})
          this.forceUpdate()
        }
      })
  }
  showUploadForm(e){
    this.setState({ showUploadingForm: true });
    e.preventDefault();
  }
  test(e){
    e.preventDefault();
    console.log(this.state)
  }
  renderWall(){
    console.log('all posts')
    console.log( this.state.allPosts )
    var elements = this.state.isShowingUserPosts ? this.state.userPosts : this.state.allPosts;
    var childElements = elements.map((i, index)=> {
      return <Post postData={i} key={index} toggleVoteStatus={this.toggleVoteStatus}/>
    });
    return childElements;
  }
  addPost(post){
    this.setState(prev=>{
        var allPosts = prev.allPosts.slice()
        allPosts.unshift(post)
        var userPosts = prev.userPosts.slice();
        userPosts.unshift(post)
      return {
        allPosts,
        userPosts
      }
    })
    this.forceUpdate()
    setTimeout(()=>{console.log(this.state)}, 2000)
    // TODO THIS IS NOT TRIGGERING A RENDER
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
        viewUserPosts={this.viewUserPosts}
      />

        <header className="App-header">
          <h1 className="App-title">
            <div className='spin'></div>
            PICPAC
            <div className='spin'></div>
            { this.state.showUploadingForm && <UploadForm addPost={this.addPost}/> }
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