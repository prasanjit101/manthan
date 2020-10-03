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
      <Container id="contain">
  <Row>

    <p>&nbsp;</p>
    <Jumbotron id="jumbo">
    <a href="/classroom"><h1>Data Structures And Algorithms</h1></a>
  
  <p>
    CS225
  </p>
</Jumbotron><Jumbotron id="jumbo">
<a href="/classroom"><h1>Graph Theory</h1></a>
  <p>
    CS307
  </p>
</Jumbotron><Jumbotron id="jumbo">
<a href="/classroom"><h1>Machine Learning</h1></a>
  
  <p>
    CS608
  </p>
</Jumbotron><Jumbotron id="jumbo">
<a href="/classroom"><h1>Disrete Mathematics</h1></a>
  
  <p>
    CS205
  </p>
</Jumbotron>
              { this.state.classrooms.map((classroom, key) => {
                return(
                  <>

                  <div className="classroom-card col-md-9 ml-auto mr-auto" key={key}>
                    <a href={{pathname: `/${user_id}/classroom/${classroom.code}`}}> <h1 className= "header">{classroom.name}</h1></a>  
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
