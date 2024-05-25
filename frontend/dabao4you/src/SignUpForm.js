import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

const SignUpForm = ({ formType }) => {
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setProfilePhoto(file);
    };

    const handleSelect = async (value) => {
        setAddress(value);
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
        // Prepare user data object
        const userData = {
            username,
            password,
            name,
            dob,
            contact,
            address,
        };

        try {
            // Call API to create user profile
            console.log('User profile created successfully:');
            // Navigate to the next page or handle success
            navigate('/success');
        } catch (error) {
            console.error('Failed to create user profile:', error);
            // Handle error as needed (e.g., show an error message)
        }
    };

    return (
        <div className="container">
            <br />
            <h4>Sign Up</h4>
            <form>
                <div className="mb-3">
                    <label htmlFor="profilePhoto" className="form-label">Profile Photo</label>
                    <input type="file" className="form-control" id="profilePhoto" onChange={handleFileChange} accept="image/*" />
                </div>
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
                    <input type="date" className="form-control" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="contact" className="form-label">Contact</label>
                    <input type="text" className="form-control" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <PlacesAutocomplete
                        value={address}
                        onChange={setAddress}
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
