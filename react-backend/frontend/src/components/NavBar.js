
import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {
  test(e){
    e.preventDefault();
    fetch( '/login', {credentials: 'include'} ).then((d)=>{ return d.blob()}).then((d)=>{console.log(d)})
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
            <a href="http://localhost:3001/login">
              <div>
                Login
              </div>
            </a>
          </li>
          <li>
            <a href="http://localhost:3001/logout">
              <div>
                Logout
              </div>
            </a>
          </li>
          <li>
            <a href="#" onClick={(e)=>this.test(e)}>
              <div>
                test
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