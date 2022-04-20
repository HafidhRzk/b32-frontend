import Image from './frame.png';
import { Link } from 'react-router-dom'
import React from 'react'

function Nav(){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark px-4">
            <img className="navbar-brand" src={Image} alt="" style={{height: '7vh', width: '5vh'}} />
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to="/complain " className="nav-link">Complain</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/profile" className="nav-link">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;