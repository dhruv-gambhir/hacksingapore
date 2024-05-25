import '../App.css';
import React, { useState } from 'react';
import NeedyNavbar from './NeedyNavbar'

function Needy_Home() {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [day, setDay] = useState('today');
    const [time, setTime] = useState('9-12');
    const [urgency, setUrgency] = useState('none');
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [posts, setPosts] = useState([]);
  
    const handleButtonClick = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      if (title.trim()) {
        const username = sessionStorage.getItem('username'); // Retrieve username from session storage
        const listAsString = todos.join(',');
        const newPost = {
          caption: title,
          day,
          range: time,
          urgency,
          list: listAsString,
          needy_username: username, // Use the retrieved username
        };
        setPosts([...posts, newPost]);
        setTitle('');
        setDay('today');
        setTime('9-12');
        setUrgency('none');
        setTodos([]);
        setShowModal(false);

        console.log('New post:', newPost);
    
        try {
          const response = await fetch('http://127.0.0.1:5000/add_task/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
          });
    
          if (!response.ok) {
            throw new Error(`Server error: ${response.status} ${response.statusText}`);
          }
    
          const result = await response.json();
          console.log('Task added successfully:', result);
        } catch (error) {
          console.error('Error adding task:', error);
        }
      }
    };

    const handleDeletePost = (index) => {
        const updatedPosts = [...posts];
        updatedPosts.splice(index, 1);
        setPosts(updatedPosts);
    };
  
    const handleAddTodo = () => {
      if (todo.trim()) {
        setTodos([...todos, todo]);
        setTodo('');
      }
    };
  
    return (
      <div className="container-fluid text-center bg-custom-purple min-vh-100">
        <div className="p-3">
          <p className="h1 text-white mt-3">Ask for Help!</p>
        </div>
  
        <button 
          type="button" 
          className="btn btn-primary btn-plus" 
          onClick={handleButtonClick}
        >
          +
        </button>
        <NeedyNavbar />
  
        {showModal && (
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Create A Request</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleFormSubmit}>
                    <div className="mb-3">
                      <label htmlFor="titleInput" className="form-label">Title</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="titleInput" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="daySelect" className="form-label">Day</label>
                      <select 
                        className="form-select" 
                        id="daySelect" 
                        value={day} 
                        onChange={(e) => setDay(e.target.value)}
                      >
                        <option value="today">Today</option>
                        <option value="tomorrow">Tomorrow</option>
                        <option value="day after">Day After</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="timeSelect" className="form-label">Time</label>
                      <select 
                        className="form-select" 
                        id="timeSelect" 
                        value={time} 
                        onChange={(e) => setTime(e.target.value)}
                      >
                        <option value="9-12">9-12</option>
                        <option value="12-3">12-3</option>
                        <option value="3-6">3-6</option>
                        <option value="6-9">6-9</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="urgencySelect" className="form-label">Urgency</label>
                      <select 
                        className="form-select" 
                        id="urgencySelect" 
                        value={urgency} 
                        onChange={(e) => setUrgency(e.target.value)}
                      >
                        <option value="none">None</option>
                        <option value="urgent">Urgent</option>
                        <option value="very urgent">Very Urgent</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="todoInput" className="form-label">To-Do List</label>
                      <div className="input-group">
                        <input 
                          type="text" 
                          className="form-control" 
                          id="todoInput" 
                          value={todo} 
                          onChange={(e) => setTodo(e.target.value)}
                        />
                        <button type="button" className="btn btn-secondary" onClick={handleAddTodo}>Add</button>
                      </div>
                      <ul className="list-group mt-2">
                        {todos.map((item, index) => (
                          <li key={index} className="list-group-item">{item}</li>
                        ))}
                      </ul>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
  
        <div className="row mt-4">
          {posts.map((post, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">Day: {post.day}</p>
                  <p className="card-text">Time: {post.time}</p>
                  <p className="card-text">Urgency: {post.urgency}</p>
                  <ul className="list-group list-group-flush">
                    {post.todos && post.todos.map((todo, idx) => (
                      <li key={idx} className="list-group-item">{todo}</li>
                    ))}
                  </ul>
                  <button 
                  className="btn btn-danger" 
                  type="button" 
                  onClick={() => handleDeletePost(index)}
                >
                  Delete
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

export default Needy_Home;