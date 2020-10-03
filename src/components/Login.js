import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {Dropdown} from 'react-bootstrap';

const CLIENT_ID = '928461249024-ugbiksni2621u5kv6vnq6ikrptdbjaah.apps.googleusercontent.com';


class GoogleBtn extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isLogined: false,
      userdata:[],
      accessToken: ''
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  } 
  
  login (response) {
    var profile = response.getBasicProfile();
    this.props.onlogin(profile)
    
    if(response.accessToken){
      this.setState(state => ({
        isLogined: true,
        userdata : profile,
        accessToken: response.accessToken
      }));
    }
  }

  logout (response) {
    this.setState(state => ({
      isLogined: false,
      accessToken: ''
    }));
  }

  handleLoginFailure (response) {
    alert('Failed to log in')
  }

  handleLogoutFailure (response) {
    alert('Failed to log out')
  }

  render() {
    return (
    <div>
      { this.state.isLogined ?
      <>
      <Dropdown alignRight>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
  <img className="dropbtn" src={this.state.userdata.getImageUrl()} width="50px"/>
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item>{this.state.userdata.getName()}</Dropdown.Item>
    <Dropdown.Item>{this.state.userdata.getEmail()}</Dropdown.Item>
    <Dropdown.Item><GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Logout'
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
        >    
        </GoogleLogout></Dropdown.Item>
    
  </Dropdown.Menu>
</Dropdown>
    
        
        </>: <GoogleLogin
          clientId={ CLIENT_ID }
          buttonText='Login'
          onSuccess={ this.login }
          onFailure={ this.handleLoginFailure }
          responseType='code,token'
          isSignedIn={true}
        />
      }
    </div>
    )
  }
}

export default GoogleBtn;