import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import SignUp from './SignUp';
import StartPage from './StartPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<StartPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
