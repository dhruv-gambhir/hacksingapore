import '../App.css';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useFetch from './useFetch';
import {Globe} from "react-bootstrap-icons";
import { GeoAlt } from "react-bootstrap-icons";

const DetailsAccepted = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [task_title, setTaskTitle] = useState('');
    const { data: task, isPending, error} = useFetch('http://localhost:8000/tasks/'+id)
    const handleAccept = (e) => {
        setTaskTitle(task.title)
        e.preventDefault();
        const task_1= {};
        console.log(task);
        fetch('http://localhost:8000/tasks/'+id, {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task_1)
        }).then(() => {
            navigate('/MainPage'); //will have to edit this later
        })
    }
    return(
        <div className="container-fluid text-center bg-custom-purple min-vh-100">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { task && 
            <div className = "align-items-center justify-content-center">
                <div className='h1 text-white mt-3'>Dabao4You</div>
                <div className="container mt-4 mb-3">
                    <div className="card border">
                        <div className="card-body text-start py-4">
                            <div className='row mt-1'>
                                <div className='col-8'>
                                    <h5 className="card-title">{task.title}</h5>
                                </div>
                                <div className='col-4'>
                                    <p className="text-primary text-end">{task.urgency}</p>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <span className='me-3'>
                                    <Globe/>
                                </span>
                                <span className="card-text">Distance: {}</span>
                            </div>
                            <div className='row mt-2'>
                                <div className='col-8'>
                                    <div className='m = 3'>
                                        <span className='me-3'>
                                            <GeoAlt/>
                                        </span>
                                        <span className="card-text mb-0">Deliver To: {task.get_location}</span>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <p className="text-end">Time: {task.time}</p>
                                </div>
                            </div>
                            <div className='mt-2 mb-3'>Groceries List:</div>
                            <div className = "list-group">
                                <label className = "list-group-item">
                                    <input className="form-check-input me-1" type="checkbox"/>{task.title}
                                </label>
                                <label className = "list-group-item">
                                    <input className="form-check-input me-1" type="checkbox"/>{task.time}
                                </label>
                                <label className = "list-group-item">
                                    <input className="form-check-input me-1" type="checkbox"/>{task.get_location}
                                </label>
                                <label className = "list-group-item">
                                    <input className="form-check-input me-1" type="checkbox"/>{task.username}
                                </label>
                            </div>
                        </div>
                        <button onClick={(e) => {handleAccept(e)}} className = "mx-auto mb-3 btn btn-outline-danger justify-content-center w-75">
                            Accept Request
                        </button>
                    </div>
                </div>
            </div>

            }

        </div>
    )
}


export default DetailsAccepted;