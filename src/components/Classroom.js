// IN THIS COMPONENT TEACHER WILL ADD TEST AND CHECK SCORES AND QUESTIONS OF ADDED TESTS 
import React, { Component } from 'react';
//import Test from './Test';
import './App.css';
import {Navbar,Nav,NavDropdown,Modal,Form,Button,Row,Col} from 'react-bootstrap';
import GoogleBtn from './Login'
import Main from './Main';

import { useState } from "react";
function CreateTestModal(props) {
  const [inputList, setInputList] = useState([{Question:"",Option1:"",Option2:"",Option3:"",Option4:"",Answer:"",Marks:2}]);
    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
   
    // handle click event of the Add button
    const handleAddClick = () => {
      setInputList([...inputList, {Question:"",Option1:"",Option2:"",Option3:"",Option4:"",Answer:"",Marks:2}]);
    };
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
        {inputList.map((x, i) => {
          return (
            <Form.Group controlId="formBasicText">
            <Form.Control id="postContent" type="text" className="form-control" placeholder="Enter the question." required value={x.Question}/>
            <br/>
            <Row>
              <Col>
            <Form.Control placeholder="Option 1" required value={x.Option1} />
            </Col>
            <Col>
            <Form.Control placeholder="Option 2" required value={x.Option2} />
            </Col>
            </Row><br/>
            <Row>
              <Col>
            <Form.Control placeholder="Option 3" required value={x.Option3}/>
            </Col>
            <Col>
            <Form.Control placeholder="Option 4" required value={x.Option4} />
            </Col>
            </Row>
            <br/>
            <Row>
              <Col>
            <Form.Control placeholder="Answer" required value={x.Answer}/>
            </Col>
            <Col>
            <Form.Control placeholder="Marks" required value={x.Marks}/>
            </Col>
            </Row>
            <br/>
            <Row>
            <Col>
            {inputList.length !== 1 && <Button
                  className="mr10"
                  onClick={() => handleRemoveClick(i)}>Remove</Button>}
            </Col>
            <Col>
            {inputList.length - 1 === i && <Button onClick={handleAddClick}>Add</Button>}
            </Col>
            </Row>
            </Form.Group>
          );
        })}
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
 
function TestModal() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Nav.Link id="nav-link"  onClick={() =>  setModalShow(true)}><span> Create Test</span></Nav.Link>
      <CreateTestModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
function MyVerticallyCenteredModal(props) {
  const [Show, setShow] = React.useState(false);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.Name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Nav as="ul">
        <Nav.Item as="li">
          <Nav.Link onClick={() => setShow(false)} >Scores</Nav.Link>
         </Nav.Item>
       <Nav.Item as="li">
        <Nav.Link onClick={() => setShow(true)} >Questions</Nav.Link>
        </Nav.Item>
</Nav>
        {Show?
        <>
         <ul>
        { props.Marks.map((i, key) => {
                return(
                  <>
                  <li>
                    <div className="classroom-card col-md-9 ml-auto mr-auto" key={key}>

                  <h3>{i.name}</h3>  
                  <p>{i.Marks}</p>
                    
                  
                  </div>
                  </li>
                  </>
                )
              })}
              </ul>
        </>
        :<>
         <ul>
        { props.Questions.map((i, key) => {
                return(
                  <>
                  <li>
                    <div className="classroom-card col-md-9 ml-auto mr-auto" key={key}>

                  <h3>{i.Question}</h3>
                  <p>{i.Marks}</p>  
                  <Row>
                    <Col>{i.option1}</Col>
                    <Col>{i.option2}</Col>
                  </Row>
                  <Row>
                    <Col>{i.option3}</Col>
                    <Col>{i.option4}</Col>
                  </Row>                                    
                  </div>
                  </li>
                  </>
                )
              })}
              </ul>
        </>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        {props.Name}
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        Marks = {props.Marks}
        Name = {props.Name}
        Questions = {props.Questions}
        onHide={() => setModalShow(false)}
      />
    </>
  );
} 
class Classroom extends Component {
  state = {
    modalShow:false,
    Tests:[],
    userid : this.props.user,
    isLoggedin: false,
    classrooms:this.props.code
  }
  constructor(props) {
    super(props);
    this.onlogin = this.onlogin.bind(this);
  }
  render() {
    return (
      <div>
        <Navbar sticky="top" bg="light" id="navbar" variant="light">
      <Navbar.Brand href="/"><img src="../logo.svg" width="70px"/> Manthan<span>.</span></Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Nav className="mr-auto">
      <NavDropdown title="Classrooms" id="basic-nav-dropdown nav-link">
      { this.state.classrooms.map((classroom, key) => {
                return(
                  <>
                  <div className="classroom-card col-md-9 ml-auto mr-auto" key={key}>
                  <NavDropdown.Item href={{pathname: `/${this.state.userid}/classroom/${classroom.code}`}}>{classroom.Name}</NavDropdown.Item>
                  </div>
                  </>
                )
              })}
      </NavDropdown>
    </Nav>
      <Nav>
      <TestModal/>
      <NavDropdown title="Notifications" id="basic-nav-dropdown nav-link">
      { this.state.classrooms.map((classroom, key) => {
                return(
                  <>
                  <div className="classroom-card col-md-9 ml-auto mr-auto" key={key}>
                  <NavDropdown.Item>{classroom.Notification}</NavDropdown.Item>
                  </div>
                  </>
                )
              })}
      </NavDropdown>
          {//THIS WILL CREATE A MODAL FORM TO CREATE NEW TEST
      }
      <GoogleBtn onlogin={this.onlogin}/>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
      <Row>
      { this.state.Tests.map((Test, key) => {
                return(
                  <>
                  <Col key={key}>
                  <App
                  Questions={Test.Questions}
                  Marks={Test.Marks}
                  Name={Test.Name}
                  />
                  </Col>
                  </>
                )
              })}
      </Row>

      </div>
    );
  }
}

export default Classroom;
