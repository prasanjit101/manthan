import React, { Component } from 'react';
import './App.css';
import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
import GoogleBtn from './Login'
import Main from './Main';

class Classsroom extends Component {
  state = {
    userdata : [],
    isLoggedin: false,
    classrooms:[]
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
  SetClassrooms(){
    let classrooms=this.props.classrooms;
    console.log(classrooms)
    this.setState({classrooms:classrooms,loading:false});
  }
  render() {
    return (
      <div>
        <Navbar sticky="top" bg="light" id="navbar" variant="light">
      <Navbar.Brand href="/"><img src="../logo.svg" width="70px"/> Manthan<span>.</span></Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Nav className="mr-auto">
      <NavDropdown title="Classrooms" id="basic-nav-dropdown ">
      { this.state.classrooms.map((classroom, key) => {
                return(
                  <>
                  <div className="classroom-card col-md-9 ml-auto mr-auto" key={key}>
                  <NavDropdown.Item href={{pathname: `/classroom/${classroom._id}`}}>{classroom.Name}</NavDropdown.Item>
                  </div>
                  </>
                )
              })}
      </NavDropdown>
    </Nav>
      <Nav>
      <Nav.Link id="nav-link" href="/"><span>Create Test</span></Nav.Link>
      <GoogleBtn onlogin={this.onlogin}/>
      </Nav>
      </Navbar.Collapse>
      </Navbar>

      </div>
    );
  }
}

export default Classsroom;
