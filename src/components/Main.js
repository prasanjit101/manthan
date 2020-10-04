//THIS COMONENTS HAVE CARDS OF EVERY CLASS OF A TEACHER
import React, { Component } from 'react';
import {db} from '../firebase'
import { Link} from "react-router-dom";
import {Container,Row,Jumbotron} from 'react-bootstrap';
import { useCollection } from 'react-firebase-hooks/database';

class Main extends Component {
	
  state={
    userData:[],
    classrooms:[]
  }
  constructor(props) {
    super(props);
  } 
  render() {
    return (
      <Container>
  <Row>
      {console.log(this.props.Classrooms)}
    <p>&nbsp;</p>   
              { this.props.Classrooms.map((classroom, key) => {
                return(
                  <>
                  <Jumbotron id="jumbo"key={key}>
                  <Link to={{pathname: `/classroom/${classroom.code}`}}><h1>{classroom.name}</h1></Link>
                    <p>
                    {classroom.code}
                    </p>
                  </Jumbotron>
                  </>
                )
              })}
  </Row>
</Container>
    );
  }
}

export default Main;