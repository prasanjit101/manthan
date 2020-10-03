import React, { Component } from 'react';
import './App.css';
import {Navbar,Nav,NavDropdown,Modal,Form,Button,Row,Col} from 'react-bootstrap';
import GoogleBtn from './Login'
import Main from './Main';

import { useState } from "react";
function CreateTestModal(props) {
  const [inputList, setInputList] = useState([{Question:"",Option1:"",Option2:"",Option3:"",Option4:"",Answer:"",Marks:2}]);
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
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
          Create Test
        </Modal.Title>
      </Modal.Header>
          <Modal.Body>
          <Form onSubmit={(event) => {
                      event.preventDefault()
                      const heading = document.getElementById("TestName").value
                      const content = document.getElementById("postContent").value
                      
                      let x = props.createPost(heading, content)
                      props.onHide();
                    }}>
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
         <Button variant="primary" type="submit">
              Submit
            </Button>
        </Form>
        </Modal.Body>
          <Modal.Footer>
         
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
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

class Classsroom extends Component {
  state = {
    Tests:[],
    userdata : [],
    isLoggedin: false,
    classrooms:[]
  }
  constructor(props) {
    super(props);
    this.onlogin = this.onlogin.bind(this);
  } 
  setModalShow(flag){
    this.setState({modalShow:flag});
  }
  onlogin(profile){
    this.setState({isLoggedin:true, userdata:profile})
    console.log('ID: ' + this.state.userdata.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + this.state.userdata.getName());
    console.log('Image URL: ' + this.state.userdata.getImageUrl());
    console.log('Email: ' + this.state.userdata.getEmail()); // This is null if the 'email' scope is not present.
  }
  SetClassrooms(){
    let classrooms=this.userdata.classrooms;
    console.log(classrooms)
    this.setState({classrooms:classrooms});
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
                  return(<>
                    <div className="classroom-card col-md-9 ml-auto mr-auto" key={key}>
                      <NavDropdown.Item href={{pathname: `/classroom/${classroom._id}`}}>{classroom.Name}</NavDropdown.Item>
                    </div>
                  </>
                  );
                })}
              </NavDropdown>
            </Nav>
            <Nav>
              <TestModal/>
              <GoogleBtn onlogin={this.onlogin}/>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Row>
          { this.state.Tests.map((Test, key) => {
            return(
                <>
                  <Col key={key}>
                    <App Questions={Test.Questions} Marks={Test.Marks} Name={Test.Name}/>
                  </Col>
                </>
              )
            })
          }
        </Row>
      </div>
    );
  }
}

export default Classsroom;