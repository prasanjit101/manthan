import React, { Component } from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import './App.css'
class Example extends Component {

  render() {
    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Example;
