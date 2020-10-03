//THIS COMONENTS HAVE CARDS OF EVERY CLASS OF A TEACHER
import React, { Component } from 'react';
import {Container,Row,Jumbotron} from 'react-bootstrap';
class Main extends Component {

  state={
    userData:[],
    classrooms:[]
  }
  SetClassrooms(){
    let classrooms=this.props.classrooms;
    console.log(classrooms)
    this.setState({classrooms:classrooms,loading:false});
  }
  
  render() {
    return (
      <Container>
  <Row>

    <p>&nbsp;</p>
    <Jumbotron id="jumbo">
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
                    <a href={{pathname: `/classroom/${classroom._id}`}}> <h1 className= "header">{classroom.name}</h1></a>  
                      <small className="code">{classroom.code}</small>
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
