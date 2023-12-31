import React, { useState, useContext } from 'react';
import './SignUpForm.css';
import FileUploader from '../file-uploader/FileUploader.js';
import {loggedInContext} from '../app/App'

const SignUpForm = ({ navigate }) => {

  const [loggedIn, setLoggedIn] = useContext(loggedInContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState(null);

  if(loggedIn) {navigate('/posts')}

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userName) {
      alert(`Thank you, ${userName}, for signing up!`);
    }

    fetch( '/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password, userName: userName, photo: userPhoto })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleNameChange = (event) => {
    setUserName(event.target.value)
  }

  const handlePhotoChange = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUserPhoto(reader.result);
    }
  }

    return (
      <>
        <div className="signup-form">
        <h1>Sign up</h1><br></br>
        <p>Please enter a valid email and password to sign up.</p><br></br>
          <form onSubmit={handleSubmit}>
            <input placeholder='Name' id="user-name" type='text' value={userName} onChange={handleNameChange} /><br></br>
            <input placeholder='Email' id="email" type='text' value={email} onChange={handleEmailChange} /><br></br>
            <input className="input-field" placeholder='Password' id="password" type='password' value={password} onChange={handlePasswordChange} /><br></br>
            <p>Please upload a profile picture</p>
            < FileUploader onFileSelectSuccess={(file) => {handlePhotoChange(file)}} onFileSelectError={({error}) => alert(error)} userPhoto={ userPhoto } setUserPhoto={ setUserPhoto }/><br></br><br></br>
            <input role='submit-button' id='submit' type="submit" value="Sign-up" />
          </form>
        </div>
      </>
    );
}

export default SignUpForm;
