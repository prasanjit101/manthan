
import React from 'react'
import {Dropdown} from 'react-bootstrap';
import {auth} from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function GoogleBtn(){
	
	const [user] = useAuthState(auth);
	const { uid, photoURL } = auth.currentUser;
	const signInWithGoogle = () => {
    const provider = new auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

    return (
    <div>
      { user ?
      <>
      <Dropdown alignRight>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
  <img className="dropbtn" alt="avtar" src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} width="50px"/>
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item>{user.displayName}</Dropdown.Item>
    <Dropdown.Item>{user.email}</Dropdown.Item>
    <Dropdown.Item>{uid}</Dropdown.Item>
    <Dropdown.Item>
		<button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
	</Dropdown.Item>
    
  </Dropdown.Menu>
</Dropdown>
        </>: <button className="sign-in" onClick={signInWithGoogle}>Sign in</button>
      }
    </div>
    )
}

export default GoogleBtn;