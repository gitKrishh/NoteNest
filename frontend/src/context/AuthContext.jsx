import React, { createContext, useState, useEffect } from 'react';

// 1. Create the context
export const AuthContext = createContext(null);

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check if user is already logged in from localStorage when the app loads
    useEffect(() => {
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // The login function that components can call
    const login = (userData) => {
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setUser(userData);
    };

    // The logout function
    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};