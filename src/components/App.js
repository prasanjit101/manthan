import React, { Component } from 'react';
import './App.css';
import {Navbar,Nav} from 'react-bootstrap';
import GoogleBtn from './Login'
import Main from './Main';

class App extends Component {
  state = {
    userdata : [],
    isLoggedin: false
  }
  constructor(props) {
    super(props);
    this.onlogin = this.onlogin.bind(this);
  } 
  onlogin(profile){
    this.setState({isLoggedin:true, userdata:profile})
    console.log('ID: ' + this.state.userdata.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + this.state.userdata.getName());
    console.log('Image URL: ' + this.state.userdata.getImageUrl());
    console.log('Email: ' + this.state.userdata.getEmail()); // This is null if the 'email' scope is not present.
  }
  render() {
    return (
      <div>
        <Navbar sticky="top" bg="dark" id="navbar" variant="dark">
      <Navbar.Brand href="/"><img src="../logo.svg" width="70px"/> Manthan<span>.</span></Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Nav>
      <Nav.Link id="nav-link" href="/"><span>Create Classroom</span></Nav.Link>
      <GoogleBtn onlogin={this.onlogin}/>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
        <Main userdata={this.state.userdata}/>
        
      </div>
    );
  }
}

export default App;
