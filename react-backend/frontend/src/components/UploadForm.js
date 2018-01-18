import React, { Component } from 'react';
import './UploadForm.css';

class NavBar extends Component {
  submitLinks(e) {
    fetch('/createLink')
      .then(res=>res.json())
      .then(res=>console.log(res))
  }
  render() {
    return (
      <form action="javascript:void(0)" id="uploadForm">
        <label>link:<input type="text" id="link" /></label>
        <button id="clipboard">&larr;&#128203;</button>
        <button id="submit" onClick={this.submitLinks}>Submit</button>
      </form>
    )
  }
}

export default NavBar;