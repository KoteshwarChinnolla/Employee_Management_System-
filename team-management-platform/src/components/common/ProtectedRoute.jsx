import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = ({ component: Component, requireAdmin, ...rest }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f5f5f5'
            }}>
                <div style={{
                    padding: '20px',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <Route
            {...rest}
            render={props => {
                if (!user) {
                    // Not logged in, redirect to login page
                    return <Redirect to="/" />;
                }

                // Check if admin access is required
                if (requireAdmin && user.role.toLowerCase() !== 'admin') {
                    // Not admin, redirect to employee dashboard
                    return <Redirect to={`/employee/home/${user.id}/${encodeURIComponent(user.name)}`} />;
                }

                // Allow admin to access employee routes for settings and details
                const adminCanAccessEmployeeRoutes =
                    user.role.toLowerCase() === 'admin' &&
                    (
                        props.location.pathname.startsWith('/employee/settings') ||
                        props.location.pathname.startsWith('/employee-details/')
                    );
                if (adminCanAccessEmployeeRoutes) {
                    return <Component {...props} />;
                }

                // Authorized, render component
                return <Component {...props} />;
            }}
        />
    );
};

export default ProtectedRoute;