import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // If user is not logged in, redirect them to the login page
        return <Navigate to="/login" />;
    }

    return children; // If user is logged in, render the component they are trying to access
};

export default ProtectedRoute;