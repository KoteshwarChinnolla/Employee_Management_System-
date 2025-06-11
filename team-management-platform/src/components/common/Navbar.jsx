import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { COLORS } from '../../theme/colors';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ onSidebarToggle }) => {
    const { user, logout } = useContext(AuthContext);
    const history = useHistory();

    const navbarStyle = {
        background: COLORS.darkBlue,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1100,
        height: '56px'
    };

    const brandStyle = {
        fontSize: '1.7rem',
        letterSpacing: '2px',
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        color: COLORS.white
    };

    const navLinkStyle = {
        color: COLORS.gray,
        fontWeight: 500,
        marginLeft: '12px',
        transition: 'color 0.3s ease'
    };

    const navLinkHoverStyle = {
        color: COLORS.blue
    };

    const brandHighlight = {
        color: COLORS.blue,
        marginRight: 8
    };

    // Hamburger button style
    const hamburgerStyle = {
        background: 'transparent',
        border: 'none',
        color: COLORS.white,
        fontSize: 24,
        marginRight: 16,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer'
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={navbarStyle}>
            <div className="container-fluid" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Hamburger for sidebar (mobile only) */}
                <button
                    style={hamburgerStyle}
                    className="d-lg-none"
                    aria-label="Open sidebar"
                    onClick={onSidebarToggle}
                >
                    <FaBars />
                </button>
                <Link className="navbar-brand" to="/" style={brandStyle}>
                    <span style={brandHighlight}>Team</span>
                    <span>Management</span>
                </Link>
                {/* Desktop nav links */}
                <div className="d-none d-lg-flex" style={{ alignItems: 'center' }}>
                    <ul className="navbar-nav me-auto" style={{ flexDirection: 'row' }}>
                        {user && user.role === 'employee' && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to={`/employee/home/${user.id}/${encodeURIComponent(user.name)}`}
                                    style={navLinkStyle}
                                    onMouseOver={e => e.target.style.color = navLinkHoverStyle.color}
                                    onMouseOut={e => e.target.style.color = navLinkStyle.color}
                                >
                                    Employee Portal
                                </Link>
                            </li>
                        )}
                        {user && user.role === 'admin' && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/admin/dashboard"
                                    style={navLinkStyle}
                                    onMouseOver={e => e.target.style.color = navLinkHoverStyle.color}
                                    onMouseOut={e => e.target.style.color = navLinkStyle.color}
                                >
                                    Admin Portal
                                </Link>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav ms-auto" style={{ flexDirection: 'row' }}>
                        {!user && (
                            <>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/login"
                                        style={navLinkStyle}
                                        onMouseOver={e => e.target.style.color = navLinkHoverStyle.color}
                                        onMouseOut={e => e.target.style.color = navLinkStyle.color}
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        to="/register"
                                        style={navLinkStyle}
                                        onMouseOver={e => e.target.style.color = navLinkHoverStyle.color}
                                        onMouseOut={e => e.target.style.color = navLinkStyle.color}
                                    >
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                        {user && (
                            <li className="nav-item">
                                <button
                                    className="nav-link btn btn-link"
                                    onClick={() => {
                                        logout();
                                        history.push('/login');
                                    }}
                                    style={{
                                        ...navLinkStyle,
                                        background: 'transparent',
                                        border: 'none',
                                        padding: 0,
                                        cursor: 'pointer'
                                    }}
                                    onMouseOver={e => e.target.style.color = navLinkHoverStyle.color}
                                    onMouseOut={e => e.target.style.color = navLinkStyle.color}
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
