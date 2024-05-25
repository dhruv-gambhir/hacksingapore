import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { useLocation } from 'react-router-dom';

const SignUpForm = ({ formType }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [contact, setContact] = useState('');
    const [location, setLocation] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const navigate = useNavigate();


    const handleSelect = async (value) => {
        setLocation(value);
        try {
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);
            console.log('Geocode Success:', latLng);
            // You can set latitude and longitude in your user data object
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSubmitButton = async () => {
        
        const userData = {
            username,
            age,
            password,
            name,
            dob,
            contact,
            location,
        };
    
        console.log(userData);

        const url = needHelp ? 'http://127.0.0.1:5000/need_help/add_data' : 'http://127.0.0.1:5000/give_help/add_data'
        
        try {
            const response = await fetch(url, {
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
        } catch (error) {
            console.error('Error:', error);
        }
        
        navigate('/SignIn');
        
    };


    const location2 = useLocation();
    const searchParams = new URLSearchParams(location2.search);
    const needHelp = searchParams.get('needHelp') === 'true';

    return (
        <div className="container">
            <br />
            <h4>Sign Up</h4>
            <p>Need Help: {needHelp ? 'Yes' : 'No'}</p>
            <form>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" id="dob" value={dob} onChange={(e) => {
                        setDob(e.target.value);
                        setAge(new Date().getFullYear() - new Date(e.target.value).getFullYear());
                    }
                    } />
                </div>
                <div className="mb-3">
                    <label htmlFor="contact" className="form-label">Contact</label>
                    <input type="text" className="form-control" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Address</label>
                    <PlacesAutocomplete
                        value={location}
                        onChange={setLocation}
                        onSelect={handleSelect}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                                <input
                                    {...getInputProps({
                                        placeholder: 'Enter your address',
                                        className: 'form-control',
                                    })}
                                />
                                <div>
                                    {loading ? <div>Loading...</div> : null}
                                    {suggestions.map((suggestion) => {
                                        const style = {
                                            backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                                        };
                                        return (
                                            <div {...getSuggestionItemProps(suggestion, { style })}>
                                                {suggestion.description}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </PlacesAutocomplete>
                </div>
                <button type="button" className="btn btn-primary " onClick={handleSubmitButton}>Complete Profile Setup</button>
            </form>
        </div>
    );
};

export default SignUpForm;
