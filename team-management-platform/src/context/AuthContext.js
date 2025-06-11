import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initial load
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        // Sync user to localStorage
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = async (userData) => {
        setLoading(true);
        try {
            setUser(userData);
            // Redirect will be handled by the Login component
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        // history.push('/login'); // Remove navigation from here
    };

    const updateUser = (updates) => {
        setUser(prev => ({
            ...prev,
            ...updates,
            lastUpdated: new Date().toISOString()
        }));
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            loading, 
            login, 
            logout,
            updateUser,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };