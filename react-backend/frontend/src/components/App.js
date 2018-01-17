import React, { Component } from 'react';
import './App.css';
import NavBar from './NavBar';
import Masonry from 'react-masonry-component'

var masonryOptions = {
  transitionDuration: 600,
  columnWidth: 200,
  gutter: 10,
  fitWidth: true
}

class App extends Component {

  componentWillMount() {
    document.title = 'PICPAC'
  }

  renderWall(){
    // TODO query elements
    var elements = [ {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'},  {src:'t.jpg', alt: 'bleh'} ]
    var childElements = elements.map((i, index)=> {
      return (
        <li key={index} className="grid-item">
          <a href="#">
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
      <NavBar />
        <header className="App-header">
          <h1 className="App-title">
            <div className='spin'></div>
            PICPAC
            <div className='spin'></div>
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
