import '../App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useFetch from './useFetch';
import { GeoAlt } from "react-bootstrap-icons";
import { CheckCircle } from "react-bootstrap-icons";

const AcceptedTasks = () => {
    const { data: tasks, isPending, error} = useFetch('http://localhost:8000/tasks')
    //const { data: tasks, isPending, error} = useFetch('http://localhost:8000/tasks/'+volunteerid)

    return(
        <div className="container-fluid text-center bg-custom-purple min-vh-100">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { tasks && 
            <div className="container">
                <h1 className='container h1 text-white mt-3'>Your Accepted Tasks!</h1>
                {tasks.map((task) => (
                    <div className="container mt-2 mb-3">
                        <div className="card border">
                            <div className="card-body text-start py-4">
                                <div className='row'>
                                    <div className='col-8'>
                                        <h5 className="card-title">{task.title}</h5>
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
                                            <span className="card-text mb-0">Pick up goodies from: {task.get_location}</span>
                                        </div>
                                        <div className='m = 3'>
                                            <span className='me-3'>
                                                <CheckCircle/>
                                            </span>
                                            <span className="card-text m-0">Deliver to: {task.pin}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link to = {`/DetailsAccepted/${task.username}`} className="mx-auto mb-4 btn btn-outline-success justify-content-center w-75">Check Details</Link>
                        </div>
                    </div>
                ) )}          
            </div>

            }

        </div>
    )
}


export default AcceptedTasks;