import React, { Component } from 'react';
import './App.css';
import {Navbar,Nav,NavDropdown,Dropdown,Modal,Form,Button,Row,Col, Container} from 'react-bootstrap';
import GoogleBtn from './Login';
import {db} from '../firebase';

import { Link} from "react-router-dom";



import { useState } from "react";

function CreateTestModal(props) {
  const [inputList, setInputList] = useState([{question:"",option1:"",option2:"",option3:"",option4:"",answer:"",marks:2}]);
  const [rulesList, setRulesList] = useState([{start:"",end:"",number:""}]);
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
  const handleRuleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...rulesList];
    list[index][name] = value;
    setRulesList(list);
  };
  const handleRemoveRule = index => {
      const list = [...rulesList];
      list.splice(index, 1);
      setRulesList(list);
  };
  const handleAddRule = () => {
      setRulesList([...rulesList, {Type:"1",Number:-1}]);
  };
  const handleAddClick = () => {
    setInputList([...inputList, {question:"",option1:"",option2:"",option3:"",option4:"",answer:"",marks:2}]);
  };
  return (
    <Modal
      {...props}
      size="xl"
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
        <Form>
          <Form.Group controlId="formBasicText">
              <Form.Control id="TestName" type="text" className="form-control" placeholder="Test Name"  required />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="formBasicText">
              <Form.Label>Exam Duration</Form.Label>
                <Form.Control id="Duration" type="text" className="form-control" Value="hr:min:sec" required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicText">
              <Form.Label>Exam Date</Form.Label>
                <Form.Control id="Date" type="date" className="form-control" placeholder="Examination Date" required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicText">
              <Form.Label>Exam Time</Form.Label>
                <Form.Control id="Time" type="time" className="form-control" placeholder="Examination Time" required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicText">
              <Form.Label>Maximum Marks</Form.Label>
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
                    <Form.Control placeholder="Option 1" name="Option1" required  onChange={e => handleInputChange(e, i)} />
                  </Col>
                  <Col>
                    <Form.Control placeholder="Option 2" name="Option2" required   onChange={e => handleInputChange(e, i)} />
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>
                    <Form.Control placeholder="Option 3"name="Option3" required  onChange={e => handleInputChange(e, i)} />
                  </Col>
                  <Col>
                    <Form.Control placeholder="Option 4" name="Option4" required  onChange={e => handleInputChange(e, i)} />
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>
                    <Form.Control placeholder="Answer" name="Answer" required  onChange={e => handleInputChange(e, i)} />
                  </Col>
                  <Col>
                    <Form.Control type="text" name="Type" placeholder="Type of question if required "  onChange={e => handleInputChange(e, i)} />
                  </Col>
                  <Col>
                    <Form.Control type="number" name="Marks" placeholder="Marks " required  onChange={e => handleInputChange(e, i)} />
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>
                    {inputList.length !== 1 && <Button variant="danger" className="mr10" onClick={() => handleRemoveClick(i)}>Remove Question</Button>}
                    {inputList.length - 1 === i && <Button id="button" onClick={handleAddClick}>Add Question</Button>}
                  </Col>
                </Row>
              </Form.Group>
            );
          })}
          {rulesList.map((x, i) => {
            return (
              <Form.Group controlId="formBasicText">
                <Form.Label>Rules</Form.Label>
                <Row>
                  <Col>
                    <Form.Control placeholder="Type of question" name="Type" onChange={e => handleRuleChange(e, i)} />
                  </Col>
                  <Col>
                    <Form.Control type="number" placeholder="Number of question to be selected " name="Numbers" onChange={e => handleRuleChange(e, i)} />
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>
                    {rulesList.length !== 1 && <Button variant="danger"  className="mr10" onClick={() => handleRemoveRule(i)}>Remove Rule</Button>}
                    {rulesList.length - 1 === i && <Button id="button" onClick={handleAddRule}>Add Rule</Button>}
                  </Col>
                </Row>
              </Form.Group>
            );
          })}
          
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="success" type="submit" onClick={(event) => {
                      event.preventDefault()
                      const Name = document.getElementById("TestName").value
                      const Duration = document.getElementById("Duration").value
                      const Max = document.getElementById("Max").value
                      const Date = document.getElementById("Date").value
                      const Time = document.getElementById("Time").value
                      
                      let x = props.createTest(Name,Date,Time,Duration,Max,inputList)
                      props.onHide();
        }}>
            Submit
          </Button>
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
      <CreateTestModal show={modalShow} createTest={props.createTest} onHide={() => setModalShow(false)} />
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
    test:[],
    show:false,
    userdata : [],
    isLoggedin: false
    }
  constructor(props) {
    super(props);
    this.onlogin = this.onlogin.bind(this);
	this.createTest= this.createTest.bind(this);
  } 
  createTest(name,date,time,duration,max,inputList,rules){
	  
	var emailId= this.state.userdata.getEmail().replaceAll(".","Dot");
  var code='co205';
  var testCode=name+date+time;
  console.log(testCode);
	//the variable code is the classroom code of the teacher and testCode is the test code
	
	db.ref('educator').child(emailId).child(code).child('test').child(testCode).set({ done:0, rules: rules, duration:duration, maxNumber:max, questions:inputList});
  }
  setShow(flag){
    this.setState({show:flag});
    console.log(this.state.show);
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
        {console.log("classroom",this.props.location.classprops)}
        <Navbar sticky="top" bg="light" id="navbar" variant="light">
          <Navbar.Brand href="/"><img src="../logo.svg" width="70px"/> Manthan<span>.</span></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <TestModal createTest={this.createTest}/>
              <GoogleBtn onlogin={this.onlogin}/>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    
        <Row>
          <Col xs lg="2" id="vert">
            <ul>
            <li>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown">
                      Test 1
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {this.setShow(false);}}>Scores</Dropdown.Item>
                      <Dropdown.Item onClick={() => {this.setShow(true);}}>Questions</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                <li>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown">
                      Test 2
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => {this.setShow(false);}}>Scores</Dropdown.Item>
                      <Dropdown.Item onClick={() => {this.setShow(true);}}>Questions</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
            { this.state.Tests.map((Test, key) => {
            return(
                <li  key={key}>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown">
                      {Test.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {this.setShow(false);}}>Scores</Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setShow(true);}}>Questions</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
                 )
                })
              }
            </ul>
          </Col>
          <Col id="vert2">
              {
                !this.state.show?
                <div>
                  <h1>Scores</h1>
                  <ul>
                  <li  >
                        <Row>
                          <Col>
                          <h3>Aavishkar Mishra</h3>
                          </Col>
                          <Col>
                            <h3>Marks: 34</h3>
                          </Col>
                        </Row>
                      </li>
                      <li >
                        <Row>
                          <Col>
                          <h3>Kartik Papney</h3>
                          </Col>
                          <Col>
                            <h3>Marks: 38</h3>
                          </Col>
                        </Row>
                      </li>
                  { this.state.test.map((score, key) => {
                    return(
                      <li  key={key}>
                        <Row>
                          <Col>
                          <h3>{score.name}</h3>
                          </Col>
                          <Col>
                            <h3>Marks: {score.marks}</h3>
                          </Col>
                        </Row>
                      </li>
                      )
                    })
                  }
                  </ul>
                </div>
                :
                <div>
                  <h1>Questions</h1>
                  <ol>
                    <li>
                   <br/> <Form>
  <Form.Row>
    <Col>
      <Form.Control placeholder="Question" readOnly />
    </Col>
    <Col xs lg="2">
      <Form.Control placeholder="Marks: 4" readOnly />
    </Col>
  </Form.Row>
  <br/> 
  <Form.Row>
    <Col xs lg="2" >
    <Form.Check type="radio" aria-label="radio 1" inline
        disabled
        label="Option 1" />
        </Col>
    <Col xs lg="2">
    <Form.Check type="radio" aria-label="radio 1" inline
        disabled
        label="Option 2" />
        </Col>
    <Col xs lg="2">
    <Form.Check type="radio" aria-label="radio 1" inline
        disabled
        label="Option 3" />
        </Col>
    <Col xs lg="2">
    <Form.Check type="radio" aria-label="radio 1" inline
        disabled
        label="Option 4" />
    </Col>
  </Form.Row>
  
</Form>
                        
                      </li>
                      <li >
                     <br/> <Form>
  <Form.Row>
    <Col>
      <Form.Control placeholder="Question" readOnly />
    </Col>
    <Col xs lg="2">
      <Form.Control placeholder="Marks: 4" readOnly />
    </Col>
  </Form.Row>
  <br/> 
  <Form.Row>
    <Col xs lg="2">
    <Form.Check type="radio" aria-label="radio 1" inline
        disabled
        label="Option 1" />
        </Col>
    <Col xs lg="2">
    <Form.Check type="radio" aria-label="radio 1" inline
        disabled
        label="Option 2" />
    </Col>
    <Col xs lg="2">
    <Form.Check type="radio" aria-label="radio 1" inline
        disabled
        label="Option 3" />
        </Col>
    <Col xs lg="2">
    <Form.Check type="radio" aria-label="radio 1" inline
        disabled
        label="Option 4" />
    </Col>
  </Form.Row>
  
</Form>
                      </li>
                  { this.state.test.map((score, key) => {
                    return(
                      <li  key={key}>
                        <Row>
                          <Col>
                          <h3>{score.name}</h3>
                          </Col>
                          <Col>
                            <h3>Marks: {score.marks}</h3>
                          </Col>
                        </Row>
                      </li>
                    )
                  })
                }
                  </ol>

                </div>
              
              }
              
          </Col>
        </Row>
      </div>
    );
  }
}

export default Classsroom;