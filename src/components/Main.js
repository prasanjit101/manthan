//THIS COMONENTS HAVE CARDS OF EVERY CLASS OF A TEACHER
import React, { Component } from 'react';
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
            <div className="conatainer">
              <p>&nbsp;</p>
              <div className="classroom-card col-md-9 ml-auto mr-auto">
                    <a href={{pathname: `/classroom/${55}`}}> <h1 className= "header">classroom.name</h1></a>  
                      <small className="code">classroom.code</small>
                  </div>
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
            </div>
    );
  }
}

export default Main;
