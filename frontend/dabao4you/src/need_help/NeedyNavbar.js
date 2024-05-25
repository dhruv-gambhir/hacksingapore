import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faComments, faUser } from '@fortawesome/free-solid-svg-icons';

function NeedyNavbar() {
    return (
      <nav className="navbar navbar-light bg-light fixed-bottom">
        <div className="container-fluid d-flex justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/Home">
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Chat">
                <FontAwesomeIcon icon={faComments} />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Profile">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

export default NeedyNavbar;