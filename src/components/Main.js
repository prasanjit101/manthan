//THIS COMONENTS HAVE CARDS OF EVERY CLASS OF A TEACHER
import React, { Component } from 'react';
import {firestore} from '../firebase'
import {Container,Row,Jumbotron} from 'react-bootstrap';
import { useCollection } from 'react-firebase-hooks/firestore';

class Main extends Component {
	
  state={
    userData:[],
    classrooms:[]
  }

  render() {
    return (
      <Container>
  <Row>

    <p>&nbsp;</p>
    <Jumbotron id="jumbo">
    <a href="/classroom"><h1>Class Name</h1></a>
  <p>
    Class code
  </p>
</Jumbotron><Jumbotron id="jumbo">
  <h1>Class Name</h1>
  <p>
    Class code
  </p>
</Jumbotron><Jumbotron id="jumbo">
  <h1>Class Name</h1>
  <p>
    Class code
  </p>
</Jumbotron><Jumbotron id="jumbo">
  <h1>Class Name</h1>
  <p>
    Class code
  </p>
</Jumbotron><Jumbotron id="jumbo">
  <h1>Class Name</h1>
  <p>
    Class code
  </p>
</Jumbotron><Jumbotron id="jumbo">
  <h1>Class Name</h1>
  <p>
    Class code
  </p>
</Jumbotron><Jumbotron id="jumbo">
  <h1>Class Name</h1>
  <p>
    Class code
  </p>
</Jumbotron><Jumbotron id="jumbo">
  <h1>Class Name</h1>
  <p>
    Class code
  </p>
</Jumbotron>
              { this.state.classrooms.map((classroom, key) => {
                return(
                  <>

                  <div className="classroom-card col-md-9 ml-auto mr-auto" key={key}>
                  <Jumbotron id="jumbo">
                    <a href={{pathname: `/${this.state.userData}/classroom/${classroom.code}`}}><h1>{classroom.name}</h1></a>
                    <p>
                    {classroom.code}
                    </p>
                  </Jumbotron>
                  </div>
                  </>
                )
              })}
  </Row>
</Container>
    );
  }
}

export default Main;
