import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import StartPage from './StartPage';
import MainPage from './Volunteer/MainPage';
import TaskDetails from './Volunteer/TaskDetails';
import AcceptedTasks from './Volunteer/AcceptedTasks';
import DetailsAccepted from './Volunteer/DetailsAccepted';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<StartPage/>}/>
        <Route path={'/SignUp'} element={<SignUp/>}/>
        <Route path={'/MainPage'} element={<MainPage/>}/>
        <Route path={'/DetailsAccepted/:id'} element={<DetailsAccepted/>}/>
        <Route path={'/TaskDetails/:id'} element={<TaskDetails/>}/>
        <Route path={'/AcceptedTasks'} element={<AcceptedTasks/>}/>
      </Routes>
    </Router>
  );
}

export default App;
