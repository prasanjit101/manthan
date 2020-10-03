import React, { Component } from 'react';
import './App.css';
import {Navbar,Nav,NavDropdown,Modal,Form,Button,Row,Col} from 'react-bootstrap';
import GoogleBtn from './Login';
import {db} from '../firebase'


import { useState } from "react";

function CreateTestModal(props) {
  const [inputList, setInputList] = useState([{question:"",option1:"",option2:"",option3:"",option4:"",answer:"",marks:2}]);
  const [rulesList, setRulesList] = useState([{Start:"",End:"",Number:""}]);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
    const handleRemoveClick = index => {
      const list = [...inputList];
      list.splice(index, 1);
      setInputList(list);
    };
    const handleAddClick = () => {
      setInputList([...inputList, {question:"",option1:"",option2:"",option3:"",option4:"",answer:"",marks:2}]);
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
                      const Name = document.getElementById("TestName").value
                      const Duration = document.getElementById("Duration").value
                      const Max = document.getElementById("Max").value
                      
                      let x = props.createTest(Name,Duration,Max,inputList)
                      props.onHide();
                    }}>
            <Form.Group controlId="formBasicText">
              <Form.Control id="TestName" type="text" className="form-control" placeholder="Test Name"  required />
            </Form.Group>
            <Row>
              <Col>
              <Form.Group controlId="formBasicText">
              <Form.Control id="Duration" type="text" className="form-control" Value="hr:min:sec" required />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group controlId="formBasicText">
              <Form.Control id="Max" type="number" className="form-control" placeholder="Maximum Marks" required />
            </Form.Group>
              </Col>
            </Row>
        {inputList.map((x, i) => {
          return (
            <Form.Group controlId="formBasicText">
              <Form.Label>Question</Form.Label>
            <Form.Control id="Question" name="Question" type="text" className="form-control" placeholder="Enter the question."  required onChange={e => handleInputChange(e, i)} />
            <br/>
            <Row>
              <Col>
            <Form.Control placeholder="option 1" name="option1" required  onChange={e => handleInputChange(e, i)} />
            </Col>
            <Col>
            <Form.Control placeholder="option 2" name="option2" required   onChange={e => handleInputChange(e, i)} />
            </Col>
            </Row><br/>
            <Row>
              <Col>
            <Form.Control placeholder="option 3"name="option3" required  onChange={e => handleInputChange(e, i)} />
            </Col>
            <Col>
            <Form.Control placeholder="option 4" name="option4" required  onChange={e => handleInputChange(e, i)} />
            </Col>
            </Row>
            <br/>
            <Row>
              <Col>
            <Form.Control placeholder="answer" name="answer" required  onChange={e => handleInputChange(e, i)} />
            </Col>
            <Col>
            <Form.Control type="number" name="marks" placeholder="marks" required  onChange={e => handleInputChange(e, i)} />
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

function TestModal(props) {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Nav.Link id="nav-link"  onClick={() =>  setModalShow(true)}><span> Create Test</span></Nav.Link>
      <CreateTestModal
        show={modalShow}
        createTest={props.createTest}
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
                  <p>{i.marks}</p>
                    
                  
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

                  <h3>{i.question}</h3>
                  <p>{i.marks}</p>  
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
        Marks = {props.marks}
        Name = {props.name}
        Questions = {props.questions}
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
	this.createTest= this.createTest.bind(this);
  } 
  createTest(name,duration,max,inputList){
	  
	var emailId= this.state.userdata.getEmail().replaceAll(".","Dot");
	var code='co205';
	var testCode='test01';
	//the variable code is the classroom code of the teacher and testCode is the test code
	
	db.ref('educator').child(emailId).child(code).child('test').child(testCode).set({ done:0, description: description, duration:duration, maxNumber:max, questions:inputList});
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
              <TestModal createTest={this.createTest}/>
              <GoogleBtn onlogin={this.onlogin}/>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Row>
          { this.state.Tests.map((Test, key) => {
            return(
                <>
                  <Col key={key}>
                    <App Questions={Test.questions} Marks={Test.marks} Name={Test.name}/>
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