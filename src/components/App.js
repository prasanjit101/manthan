import React from 'react';
import './App.css';
import {Navbar,Nav} from 'react-bootstrap';
import GoogleBtn from './Login'
import Main from './Main';
import {auth} from '../firebase';


function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )
}

function App() {
  var user = auth.currentUser;
  return (
	{user ?
	<>
	<div>
        <Navbar sticky="top" bg="dark" id="navbar" variant="dark">
      <Navbar.Brand href="/"><img alt="logo" src="../logo.svg" width="70px"/> Manthan<span>.</span></Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Nav>
      <Nav.Link id="nav-link" href="/"><span>Create</span></Nav.Link>
      <GoogleBtn/>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
	  <Main name = "user.displayName" email = "user.email" photoUrl = "user.photoURL" />
      </div>
	  </>:<SignIn/>
	   }
      
    );
}

export default App;
