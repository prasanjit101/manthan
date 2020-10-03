// IN THIS COMPONENT TEACHER WILL ADD TEST AND CHECK SCORES AND QUESTIONS OF ADDED TESTS 
import React, { Component } from 'react';
//import Test from './Test';
import './App.css';
class Classroom extends Component {
    state={
        tests:[],
        create: true,
      }

  render() {
    return (
        <>
        <div className="vertical-nav" >
        { this.state.tests.map((test, key) => {
               // <a>{test.name}</a>
        })}
        </div>
        {//this.state.create?<Test create = {this.state.create}/>:null
        }
        </>
    );
  }
}

export default Classroom;
