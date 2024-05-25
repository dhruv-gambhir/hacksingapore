import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {

    return(
    <div class='container-fluid text-black text-center p-5' style={{ backgroundColor: '#C5CAF2' }}>
        <p class="h1">Dabao4You!</p>
        <img src="/8635980.jpg" alt="Image" className="img-fluid mt-3" />
        <p class="h3">Spread joy as you go</p>
        <button type="button" class="btn btn-light" style={{ fontColor: 'white' }}>Retrieve Myinfo with Singpass</button>

    </div>
    )
}

export default StartPage;