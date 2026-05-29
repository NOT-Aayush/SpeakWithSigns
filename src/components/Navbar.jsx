import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"
const Navbar =()=>{
    return(
        <>
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">SpeakWIthSign</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/login" className="nav-link">Admin</Link>
            </div>
        </nav>
        </>

    )

}

export default Navbar;