import React from 'react';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ fontSize: '48px', color: '#ff0000' }}>404 - Not Found</h1>
            <p style={{ fontSize: '24px' }}>Sorry, the page you are looking for does not exist.</p>
            <a href="/" style={{ fontSize: '18px', color: '#007bff' }}>Go back to Home</a>
        </div>
    );
};

export default NotFound;