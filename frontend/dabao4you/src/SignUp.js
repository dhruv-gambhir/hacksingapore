import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const handleNeedHelpClick = () => {
        console.log('I need help button pressed');
    };

    const handleWantToHelpClick = () => {
        console.log('I want to help button pressed');
    };

    return(
        <div className="container-fluid text-center bg-custom-purple min-vh-100">
        <div className="row align-items-center justify-content-center h-100">
            <div className="col-12 col-md-6 p-3">
                <div className="circle-placeholder">
                    <img src="/8635980.jpg" alt="Need Help" />
                </div>
                <button 
                    type="button" 
                    className="btn btn-light mt-3" 
                    onClick={handleNeedHelpClick}
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
                    onClick={handleWantToHelpClick}
                >
                    I want to help!
                </button>
            </div>
        </div>
    </div>
    );
}

export default SignUp;