import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';

function SignUp() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/SignUpForm');
    };

    return (
        <div className="container-fluid text-center bg-custom-purple min-vh-100">
            <div className="row align-items-center justify-content-center h-100">
                <div className="col-12 col-md-6 p-3">
                    <div className="circle-placeholder">
                        <img src="/8635980.jpg" alt="Need Help" />
                    </div>
                    <button
                        type="button"
                        className="btn btn-light mt-3"
                        onClick={handleClick}
                    >
                        I need help!
                    </button>
                </div>
                <div className="col-12 col-md-6 p-3">
                    <div className="circle-placeholder">
                        <img src="/8635980.jpg" alt="Want to Help" />
                    </div>
                    <button
                        type="button"
                        className="btn btn-light mt-3"
                        onClick={handleClick}
                    >
                        I want to help!
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
