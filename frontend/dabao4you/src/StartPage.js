import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
    const handleButtonClick = () => {
        console.log('Button pressed');
    };

    return(
        <div className="container-fluid text-center bg-custom-purple min-vh-100">
        <div className="p-3">
            <p className="h1 text-white mt-3">Dabao4You!</p>
            <img src="/8635980.jpg" alt="Image" className="img-fluid mt-4" />
            <p className="h3 text-white">Spread joy as you go</p>
            <button type="button" className="btn btn-light mt-3" onClick={handleButtonClick}>
                Retrieve Myinfo with Singpass
            </button>
        </div>
    </div>
    )
}

export default StartPage;