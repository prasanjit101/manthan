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
  SetClassrooms(){
	 const classref=firestore.collection('Educator1').doc('1234@gmail.com');
	classref.get().then((doc) => {
        if (doc.exists) {
            let classrooms = doc.data();
            this.setState({ classrooms: classrooms });
            console.log("Document data:", classrooms);
        } else {
            this.setState({ data: null });
            console.log("No such document!");
        }
    }).catch(function (error) {
        this.setState({ data: null });
        console.log("Error getting document:", error);
    });
  }

  
  render() {
    return (
      <Container>
  <Row>

    <p>&nbsp;</p>
    <Jumbotron id="jumbo">
  <h1>Class Name 1</h1>
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
