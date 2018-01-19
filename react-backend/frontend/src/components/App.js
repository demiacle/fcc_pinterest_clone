import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import UploadForm from './UploadForm';
import Masonry from 'react-masonry-component'

var masonryOptions = {
  transitionDuration: 600,
  columnWidth: 200,
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
      userPosts: [],
      allPosts: []
    }
  }
  // Check if user is logged in
  componentDidMount() {
    console.log('checking if user is logged in')
    fetch('/userData', {credentials: 'include'})
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
    fetch('/myPics', {credentials: 'include'})
      .then(res=>res.json())
      .then(res=>{
        console.log(res)
        if( res.error ){
          alert( res.error )
        } else {
          this.setState({userPosts:res.posts, isShowingUserPosts: true})
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
      return (
        <li key={index} className="grid-item">
          <a href={i.link}>
            <img src={i.link} alt={i.caption} />
            <div>
              <div className="userPortrait"><img src="https://twitter.com/PUBGpartners/profile_image?size=normal" /></div>
              likes:<span>{i.thumbsUp}</span></div>
            <p className="caption">{i.caption}</p>
          </a>
        </li>
      )
    });
    return childElements;
  }
  addPost(post){
    this.setState(prev=>{
      allPosts: prev.allPosts.push(post)
      userPosts: prev.userPosts.push(post)
    })
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
        <Masonry
          className={'grid'}
          elementType={'ul'}
          options={masonryOptions}
        >
        {this.renderWall()}
        </Masonry>
        </div>
      </div>
    );
  }
}

export default App;
