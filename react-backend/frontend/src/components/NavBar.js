
import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <a>
              <div>
                Home
              </div>
            </a>
          </li>
          <li>
            <a>
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