import '../App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useFetch from './useFetch';
import { GeoAlt } from "react-bootstrap-icons";
import { CheckCircle } from "react-bootstrap-icons";

const MainPage = () => {
    const { data: tasks, isPending, error} = useFetch('http://127.0.0.1:5000/get_taskdata/');
    console.log(tasks);

    return(
        <div className="container-fluid text-center bg-custom-purple min-vh-100">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { tasks && 
            <div className="container">
                <h1 className='container h1 text-white mt-3'>Dabao4You</h1>
                {tasks.map((task, index) => (
                    <div key={index} className="container mt-2 mb-3">
                        <div className="card border">
                            <div className="card-body text-start py-4">
                                <div className='row'>
                                    <div className='col-8'>
                                        <h5 className="card-title">{task.caption}</h5>
                                    </div>
                                    <div className='col-4'>
                                        <p className="text-primary text-end">{task.urgency}</p>
                                     </div>
                                 </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <div className='m = 3'>
                                            <span className='me-3'>
                                                <GeoAlt/>
                                            </span>
                                            <span className="card-text mb-0">Pick up goodies from: FairPrice</span>
                                        </div>
                                        <div className='m = 3'>
                                            <span className='me-3'>
                                                <CheckCircle/>
                                            </span>
                                            <span className="card-text m-0">Deliver to: 636866</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link to = {`/TaskDetails/${task.needy_username}`} className="mx-auto mb-4 btn btn-outline-success justify-content-center w-75">Check Details</Link>
                        </div>
                    </div>
                ) )}          
            </div>

            }

        </div>
    )
}


export default MainPage;