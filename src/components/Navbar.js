import React, { Component } from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import GoogleBtn from './Login'
import './App.css'
class Example extends Component {

  render() {
    return (
        
      <Navbar sticky="top" bg="dark" id="navbar" variant="dark">
      <Navbar.Brand href="/"><img src="../logo.svg" width="70px"/> Manthan<span>.</span></Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Nav>
      <Nav.Link id="nav-link" href="/"><span>Create</span></Nav.Link>
      <Nav.Link id="nav-link" href="/login"><span>Login</span></Nav.Link>
      <GoogleBtn/>
      </Nav>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}

export default Example;
