import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './SignUp';
import StartPage from './StartPage';
import SignIn from './SignIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<StartPage/>}/>
        <Route path={'/StartPage'} element={<StartPage/>}/>
        <Route path={'/SignUp'} element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
