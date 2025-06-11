import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaTachometerAlt, FaUsers, FaUserTie, FaHome, FaInfoCircle, FaBriefcase, FaCogs, FaTrophy, FaList, FaSignOutAlt, FaAddressBook } from 'react-icons/fa';
import { COLORS } from '../../theme/colors';

const Sidebar = ({ open, onClose }) => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const history = useHistory();

    // Track window width for responsive rendering
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 992);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!user) return null;

    // Sidebar style for desktop (fixed) and mobile (overlay)
    const sidebarBaseStyle = {
        minHeight: '100vh',
        background: COLORS.darkBlue,
        color: COLORS.white,
        boxShadow: '2px 0 12px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '56px',
        transition: 'width 0.3s, padding 0.3s',
        zIndex: 1040,
    };

    const sidebarDesktopStyle = {
        ...sidebarBaseStyle,
        width: '260px',
        position: 'fixed',
        left: 0,
        top: 0,
        padding: '20px 0',
        overflowX: 'hidden',
    };

    const sidebarMobileStyle = {
        ...sidebarBaseStyle,
        width: open ? '260px' : '0',
        position: 'fixed',
        left: 0,
        top: 0,
        padding: open ? '20px 0' : '0',
        overflowX: 'hidden',
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: open ? '100vw' : '0',
        height: '100vh',
        background: open ? 'rgba(0,0,0,0.25)' : 'transparent',
        zIndex: 1030,
        transition: 'background 0.3s, width 0s linear ' + (open ? '0s' : '0.3s')
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '32px',
        color: COLORS.blue,
        fontWeight: 'bold',
        letterSpacing: '1px',
        fontSize: '1.25rem'
    };

    const activeLink = {
        background: COLORS.blue,
        color: COLORS.white,
        fontWeight: 700,
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
    };
    const linkBase = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 20px',
        textDecoration: 'none',
        fontSize: '16px',
        borderRadius: '12px',
        margin: '4px 16px',
        transition: 'all 0.3s ease',
        whiteSpace: 'nowrap'
    };
    const normalLink = {
        color: COLORS.gray,
        background: 'transparent',
        fontWeight: 500,
    };

    const getLinkStyle = (path) =>
        location.pathname === path || (path.includes('/employee/home') && location.pathname.includes('/employee/home'))
            ? { ...linkBase, ...activeLink }
            : { ...linkBase, ...normalLink };

    const handleLogout = () => {
        logout();
        history.push('/login');
        if (onClose) onClose();
    };

    // Sidebar content (links + logout)
    const sidebarContent = (
        <>
            <h4 style={headerStyle}>Navigation</h4>
            <div style={{ flexGrow: 1 }}>
                {user.role.toLowerCase() === 'admin' ? (
                    <>
                        <Link to="/admin/home" style={getLinkStyle('/admin/home')} onClick={onClose}>
                            <FaHome /> Home
                        </Link>
                        <Link to="/admin/add-employee" style={getLinkStyle('/admin/add-employee')} onClick={onClose}>
                            <FaUserTie /> Add Employee
                        </Link>
                        <Link to="/admin/add-project" style={getLinkStyle('/admin/add-project')} onClick={onClose}>
                            <FaBriefcase /> Add Project
                        </Link>
                        <Link to="/admin/add-team" style={getLinkStyle('/admin/add-team')} onClick={onClose}>
                            <FaUsers /> Add Team
                        </Link>
                        <Link to="/admin/teams" style={getLinkStyle('/admin/teams')} onClick={onClose}>
                            <FaList /> All Teams
                        </Link>
                        <Link to="/admin/tickets" style={getLinkStyle('/admin/tickets')} onClick={onClose}>
                            <FaTrophy /> Tickets
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to={`/employee/home/${user.id}/${encodeURIComponent(user.name)}`}
                            style={getLinkStyle(`/employee/home/${user.id}/${encodeURIComponent(user.name)}`)}
                            onClick={onClose}
                        >
                            <FaHome /> Home
                        </Link>
                        <Link to="/employee/ProjectInfo" style={getLinkStyle('/employee/ProjectInfo')} onClick={onClose}>
                            <FaInfoCircle /> ProjectInfo
                        </Link>
                        <Link to="/employee/professional-experience" style={getLinkStyle('/employee/professional-experience')} onClick={onClose}>
                            <FaBriefcase /> Previous work
                        </Link>
                        <Link to="/employee/team" style={getLinkStyle('/employee/team')} onClick={onClose}>
                            <FaUsers /> Team
                        </Link>
                        <Link to="/employee/Tickets" style={getLinkStyle('/employee/Tickets')} onClick={onClose}>
                            <FaTrophy /> Tickets
                        </Link>
                        <Link to="/employee/all-employees" style={getLinkStyle('/employee/all-employees')} onClick={onClose}>
                            <FaAddressBook /> All Employees
                        </Link>
                        <Link to="/employee/settings" style={getLinkStyle('/employee/settings')} onClick={onClose}>
                            <FaCogs /> Settings
                        </Link>
                    </>
                )}
            </div>
            <div style={{ margin: '16px' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 20px',
                        width: '100%',
                        background: COLORS.blue,
                        color: COLORS.white,
                        border: 'none',
                        borderRadius: '12px',
                        fontWeight: 700,
                        fontSize: '16px',
                        margin: '50px 0',
                        cursor: 'pointer'
                    }}
                >
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </>
    );

    // Desktop: always visible, not overlay
    if (!isMobile) {
        return (
            <div style={sidebarDesktopStyle}>
                {sidebarContent}
            </div>
        );
    }

    // Mobile: overlay, only visible when open
    return (
        <div style={overlayStyle} onClick={onClose}>
            <div
                style={sidebarMobileStyle}
                onClick={e => e.stopPropagation()}
            >
                {open && sidebarContent}
            </div>
        </div>
    );
};

export default Sidebar;
