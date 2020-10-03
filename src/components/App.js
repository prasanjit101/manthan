import React, { Component } from 'react';
import './App.css';
import {Navbar,Nav,Modal,Form,Button,Row,Col} from 'react-bootstrap';
import GoogleBtn from './Login'
import Main from './Main';
import {db} from '../firebase';
import {useList} from 'react-firebase-hooks/database';

function CreateClassModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      scrollable
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         Create Classroom
        </Modal.Title>
      </Modal.Header>
       <Form onSubmit={(event) => {
                      event.preventDefault()
                      const Name = document.getElementById("Name").value
                      const Code = document.getElementById("Code").value
                      
                      let x = props.createClass(Name, Code)
                      props.onHide();
                    }}>
          <Modal.Body>
            <Form.Group controlId="formBasicText">
              <Form.Control id="Name" type="text" className="form-control" placeholder="Class Name" required />
              
            </Form.Group>
            <Form.Group controlId="formBasicText">
              <Form.Control id="Code" type="text" className="form-control" placeholder="Class Code" required />
              
            </Form.Group>
        </Modal.Body>
          <Modal.Footer>
          <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
          </Form>
    </Modal>
  );
} 
function ClassModal(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Nav.Link id="nav-link"  onClick={() =>  setModalShow(true)}><span> Create Classroom </span></Nav.Link>
      <CreateClassModal
        show={modalShow}
        createClass = {props.createClass}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
class App extends Component {
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

    var id = this.state.userdata.getEmail() + "";
    var emailId = id.replaceAll(".", "Dot");
    var subCode = (Code+"").toLowerCase();

   db.ref("educator").child(emailId).child(subCode).child("class").set({name: this.state.userdata.getName() ,email: this.state.userdata.getEmail()
    , className: Name, classCode: Code});  
  }
  
  GetClass(){
	/* db.ref()
	this.setState({Classrooms:}) */
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

export default App;