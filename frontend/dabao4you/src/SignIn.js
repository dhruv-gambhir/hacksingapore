import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link, json } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

const SignIn = ({ show, handleClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted');

    handleClose();
  };

  const handleSignInButton = async () => {
    // Handle sign in button logic here
    const userData = {
      username,
      password

  };

  console.log(userData);

  
  try {
      const response = await fetch('http://127.0.0.1:5000/signin', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log('Success:', result);

      sessionStorage.setItem('session_token', result.session_token);
      sessionStorage.setItem('username', result.username);
      sessionStorage.setItem('need_help', result.need_help);

      setToken(result.session_token);
      setUserType(result.need_help);

      if (result.need_help) {
        navigate('/Home')
      }


  } catch (error) {
      console.error('Error:', error);
  }
  };
  

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100" onClick={handleSignInButton} >
            Sign In
          </Button>
        </Form>
        <div className="text-center mt-3">
        <Link to="/SignUp">Don't have an account? Sign up</Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SignIn;
