
import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {
  test(e){
    e.preventDefault();
    //alert('works')
    console.log('fired')
    fetch('/login').then((d)=>{
      return d.blob();
    }).then((d)=>{
      console.log(d)
    })
  }

  render() {
    return (
      <nav>
        <ul>
          <li>
            <a href="/">
              <div>
                Home
              </div>
            </a>
          </li>
          <li>
            <a href="/login" onClick={(e)=>this.test(e)}>
              <div>
                Login
              </div>
            </a>
          </li>
          { this.props.isLoggedIn ?
          <li>
            <a>
              <div>
                My pics
              </div>
            </a>
          </li>
          :''}
          { this.props.isLoggedIn ?
          <li>
            <a>
              <div>
                Upload pic
              </div>
            </a>
          </li>
          :''}
        </ul>
      </nav>
    );
  }
}

export default NavBar;