// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CircularProgress, Box } from '@mui/material'; // For a loading spinner

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext); // Get the loading state

    // 1. If it's still loading, show a spinner (or nothing) and wait.
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // 2. Once loading is false, check if there is a user.
    if (!user) {
        return <Navigate to="/login" />;
    }

    // 3. If loading is false and there is a user, show the page.
    return children;
};

export default ProtectedRoute;