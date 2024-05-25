import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';

function StartPage() {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSignUpClick = () => {
    console.log('Sign Up button pressed');
  };

  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  const handleCloseSignIn = () => {
    setShowSignIn(false);
  };

  const navigate = useNavigate();

  return (
    <div className="container-fluid text-center bg-custom-purple min-vh-100">
      <div className="p-3">
        <p className="h1 text-white mt-3">Dabao4You!</p>
        <img src="/8635980.jpg" alt="Image" className="img-fluid mt-4" />
        <p className="h3 text-white">Spread joy as you go</p>

        <button
          type="button"
          className="btn btn-light m-3"
          onClick={handleSignUpClick}
          style={{ width: '100px' }}
        >
          Sign Up
        </button>

        <button
          type="button"
          className="btn btn-light m-3"
          onClick={handleSignInClick}
          style={{ width: '100px' }}
        >
          Sign In
        </button>
      </div>

      <SignIn show={showSignIn} handleClose={handleCloseSignIn} />
    </div>
  );
}

export default StartPage;
