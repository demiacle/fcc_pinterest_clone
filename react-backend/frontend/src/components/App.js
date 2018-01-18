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
    this.viewUserPics = this.viewUserPics.bind(this)
    this.state = {
      isLoggedIn: false,
      showUploadingForm: false
    }
  }
  // Check if user is logged in
  componentDidMount() {
    console.log('checking if user is logged in')
    fetch('/userData', {credentials: 'include'})
      .then(res => res.json() )
      .then( res => this.setState( { isLoggedIn: res.isLoggedIn } ) )
  }
  // Does not force reload for super speedy user experience
  logout(e){
    e.preventDefault();
    // TODO load the stored wall
    this.setState({ isLoggedIn: false, showUploadingForm: false });
    fetch('/logout', {credentials: 'include'})
      .catch(err=>alert('You encountered an error while logging out.'))
  }
  viewUserPics(e){
    e.preventDefault();
    alert('view user pics')
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
    // TODO query elements
    var elements = [ {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'} ]
    var childElements = elements.map((i, index)=> {
      return (
        <li key={index} className="grid-item">
          <a href={i.alt}>
            <img src={i.src} alt={i.alt} />
            <div>likes</div>
            <p className="caption">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
          </a>
        </li>
      )
    });
    return childElements;
  }

  render() {
    return (
      <div className="App">
      <NavBar 
        test={this.test}
        isLoggedIn={this.state.isLoggedIn}
        logout={this.logout}
        showUploadForm={this.showUploadForm}
        viewUserPics={this.viewUserPics}
      />
        <header className="App-header">
          <h1 className="App-title">
            <div className='spin'></div>
            PICPAC
            <div className='spin'></div>
            { this.state.showUploadingForm && <UploadForm /> }
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
