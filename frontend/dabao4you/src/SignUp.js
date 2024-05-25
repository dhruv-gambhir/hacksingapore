import './App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [showNeedHelpModal, setShowNeedHelpModal] = useState(false);
    const [showWantToHelpModal, setShowWantToHelpModal] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const handleNeedHelpClick = () => {
        console.log('I need help button pressed');
        setShowNeedHelpModal(true);
    };

    const handleWantToHelpClick = () => {
        console.log('I want to help button pressed');
        setShowWantToHelpModal(true);
    };

    const handleCloseNeedHelpModal = () => setShowNeedHelpModal(false);
    const handleCloseWantToHelpModal = () => setShowWantToHelpModal(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setProfilePhoto(file);
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

        {/* Need Help PopUp */}
        <div 
                className={`modal fade ${showNeedHelpModal ? 'show' : ''}`} 
                style={{ display: showNeedHelpModal ? 'block' : 'none' }} 
                tabIndex="-1"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Set up your profile</h5>
                            <button type="button" className="btn-close" onClick={handleCloseNeedHelpModal}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="profilePhoto" className="form-label">Profile Photo</label>
                                    <input type="file" className="form-control" id="profilePhoto" onChange={handleFileChange} accept="image/*" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="age" className="form-label">Email</label>
                                    <input type="age" className="form-control" id="age" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contact" className="form-label">Contact</label>
                                    <input type="contact" className="form-control" id="contact" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="address" className="form-control" id="address" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light">Complete Profile Setup</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Want to Help PopUp */}
            <div 
                className={`modal fade ${showWantToHelpModal ? 'show' : ''}`} 
                style={{ display: showWantToHelpModal ? 'block' : 'none' }} 
                tabIndex="-1"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Set up your profile</h5>
                            <button type="button" className="btn-close" onClick={handleCloseWantToHelpModal}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="profilePhoto" className="form-label">Profile Photo</label>
                                    <input type="file" className="form-control" id="profilePhoto" onChange={handleFileChange} accept="image/*" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="age" className="form-label">Email</label>
                                    <input type="age" className="form-control" id="age" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contact" className="form-label">Contact</label>
                                    <input type="contact" className="form-control" id="contact" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="address" className="form-control" id="address" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light">Complete Profile Setup</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;