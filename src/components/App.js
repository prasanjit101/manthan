import React, { Component } from 'react';
import './App.css';
import {Navbar,Nav,Modal,Form,Button,Row,Col} from 'react-bootstrap';
import GoogleBtn from './Login'
import Main from './Main';

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
          Modal heading
        </Modal.Title>
      </Modal.Header>
       <Form onSubmit={(event) => {
                      event.preventDefault()
                      const heading = document.getElementById("TestName").value
                      const content = document.getElementById("postContent").value
                      
                      let x = props.createPost(heading, content)
                      props.onHide();
                    }}>
          <Modal.Body>
            <Form.Group controlId="formBasicText">
              <Form.Control id="TestName" type="text" className="form-control" placeholder="Test Name" required />
              
            </Form.Group>
            <Form.Group controlId="formBasicText">
              <Form.Control id="TestName" type="text" className="form-control" placeholder="Test Name" required />
              
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
 
function ClassModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Nav.Link id="nav-link"  onClick={() =>  setModalShow(true)}><span> Create Classroom </span></Nav.Link>
      <CreateClassModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
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
      <ClassModal/>
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
