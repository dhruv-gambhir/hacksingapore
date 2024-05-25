import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onSignOut }) {
  return (
    <nav>
      <ul>
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/need_help/Chat">Chat</Link></li>
        <li><Link to="/need_help/Profile">My Profile</Link></li>
        {userType === 'volunteer' && <li><Link to="/navbar/tasks">My Tasks</Link></li>}
        <li><button onClick={onSignOut}>Sign Out</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;