import React, { Component } from 'react';
import './App.css';
import {Navbar,Nav,Modal,Form,Button,Row,Col} from 'react-bootstrap';App
import GoogleBtn from './Login'
import Main from './Main';
import {db} from '../firebase';
import {useList} from 'react-firebase-hooks/database';


class Output extends Component {
  state = {
    userdata : [],
    Classrooms:[],
    isLoggedin: false
  }
  constructor(props) {
    super(props);
    this.onlogin = this.onlogin.bind(this);
    this.createClass = this.createClass.bind(this);
  } 
  onlogin(profile){
    this.setState({isLoggedin:true, userdata:profile})
    //check user  
    //or
    // Add user
    console.log('ID: ' + this.state.userdata.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + this.state.userdata.getName());
    console.log('Image URL: ' + this.state.userdata.getImageUrl());
    console.log('Email: ' + this.state.userdata.getEmail()); // This is null if the 'email' scope is not present.
  }

  createClass(Name,Code){

/* 	db.ref(this.state.userdata.getId()).child(Code).set({students:{a},Class:{a}});
 */  }
  GetClass(){
	db.ref(this.state.userdata.getId()).child('CO205').on('value', function(snapshot) {
	this.state.Classrooms=snapshot.val();
	console.log(this.state.Classrooms)});
  }
  render() {
    return (
      <div>
      <Navbar sticky="top" bg="dark" id="navbar" variant="dark">
      <Navbar.Brand href="/"><img src="../logo.svg" width="70px"/> Manthan<span>. </span></Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Nav>
      <ClassModal createClass={this.createClass}/>
      <GoogleBtn onlogin={this.onlogin}/>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
      <Main userdata={this.state.userdata}/>        
      </div>
    );
  }
}

export default Output;