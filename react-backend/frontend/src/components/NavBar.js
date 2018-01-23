
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
          { false &&
          <li className="abs">
            <a href="testFunction" onClick={(e)=>this.props.test(e)}>
              <div>
                test
              </div>
            </a>
          </li>
          }
          { this.props.isLoggedIn &&
          <li>
            <a href={ "/posts-by/" + this.props.userName }>
              <div>
                My pics
              </div>
            </a>
          </li>
          }
          { this.props.isLoggedIn &&
          <li>
            <a href="showUploadForm" onClick={(e)=>this.props.showUploadForm(e)}>
              <div>
                New pic
              </div>
            </a>
          </li>
          }
          { this.props.isLoggedIn ?
          <li className="right">
            <a href="logout" onClick={(e)=>this.props.logout(e)}>
              <div>
                Logout
              </div>
            </a>
          </li>
          :
          <li>
            <a href={ "http://" + window.location.hostname + ":3001/login"}>
              <div>
                Login
              </div>
            </a>
          </li>
          }
          { !this.props.isLoggedIn && 
          <li className='right'>
            <a href={ "http://" + window.location.hostname + ":3001/guest-login"}>
              <div>
                Guest login
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