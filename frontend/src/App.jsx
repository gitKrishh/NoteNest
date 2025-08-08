import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header'; // Import Header
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
    return (
        <Router>
            <Header /> {/* Header will now be on every page */}
            <main>
                <Routes>
                    {/* The HomePage is now protected */}
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </main>
        </Router>
    );
};

export default App;