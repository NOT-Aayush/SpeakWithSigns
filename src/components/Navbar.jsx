import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const closeMenu = () => setIsOpen(false);

    const isActive = (path) => location.pathname === path;

    return (
        <>
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" onClick={closeMenu}>SpeakWIthSign</Link>
            </div>

            <button
                className={`navbar-toggle ${isOpen ? "active" : ""}`}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`navbar-links ${isOpen ? "open" : ""}`}>
                <Link
                    to="/"
                    className={`nav-link ${isActive("/") ? "active" : ""}`}
                    onClick={closeMenu}
                >
                    Home
                </Link>
                <Link
                    to="/admin"
                    className={`nav-link ${isActive("/admin") ? "active" : ""}`}
                    onClick={closeMenu}
                >
                    Admin
                </Link>
            </div>
        </nav>
        </>
    )
}

export default Navbar;