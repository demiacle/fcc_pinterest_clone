
import React, { Component } from 'react';
import './NavBar.css';

class NavBar extends Component {
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
          { this.props.isLoggedIn &&
          <li>
            <a href="http://localhost:3001/logout">
              <div>
                Logout
              </div>
            </a>
          </li>
          }
          <li>
            <a href="#" onClick={(e)=>this.props.test(e)}>
              <div>
                test
              </div>
            </a>
          </li>
          { this.props.isLoggedIn &&
          <li>
            <a>
              <div>
                My pics
              </div>
            </a>
          </li>
          }
          { this.props.isLoggedIn &&
          <li>
            <a>
              <div>
                Upload pic
              </div>
            </a>
          </li>
          }
        </ul>
      </nav>
    );
  }
}

export default NavBar;