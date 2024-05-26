import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import StartPage from './StartPage';
import MainPage from './Volunteer/MainPage';
import TaskDetails from './Volunteer/TaskDetails';
import AcceptedTasks from './Volunteer/AcceptedTasks';
import DetailsAccepted from './Volunteer/DetailsAccepted';
import SignIn from './SignIn';
import SignUpForm from './SignUpForm';
import Needy_Home from './need_help/MainPage';
//import Needy_Profile from 'need_help/Profile';
import Needy_Chat from './need_help/Chat';
//import Volunteer_Home from 'give_help/MainPage';
//import Volunteer_Profile from 'give_help/Profile';
//import Volunteer_Chat from 'give_help/Chat';
//import Volunteer_Tasks from 'give_help/Tasks';
import '@fortawesome/fontawesome-free/css/all.css';

//
function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<StartPage/>}/>
        <Route path={'/StartPage'} element={<StartPage/>}/>
        <Route path={'/SignUp'} element={<SignUp/>}/>
        <Route path={'/Volunteer/Home'} element={<MainPage/>}/>
        <Route path={'/DetailsAccepted/:id'} element={<DetailsAccepted/>}/>
        <Route path={'/TaskDetails/:id'} element={<TaskDetails/>}/>
        <Route path={'/AcceptedTasks'} element={<AcceptedTasks/>}/>
        <Route path={'/SignIn'} element={<SignIn/>}/>
        <Route path={'/SignUpForm'} element={<SignUpForm/>}/>
        <Route path={'/Home'} element={<Needy_Home/>}/>
        <Route path={'/Chat'} element={<Needy_Chat/>}/>
      </Routes>
    </Router>
  );
}

export default App;
