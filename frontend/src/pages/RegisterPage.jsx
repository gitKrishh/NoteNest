// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register({ name, email, password });
            navigate('/login');
        } catch (err) {
            const message = err.response?.data?.message || 'Registration failed. Please try again.';
            setError(message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[--color-bg] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-[--color-text-dark]">
                        Create a new account
                    </h2>
                </div>
                <form className="mt-8 space-y-6 bg-[--color-card] p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-4 rounded-md bg-red-50 text-sm text-[--color-error]">
                            {error}
                        </div>
                    )}
                    <div className="rounded-md shadow-sm space-y-4">
                        <input
                            name="name"
                            type="text"
                            required
                            className="appearance-none relative block w-full px-3 py-2 border border-[--color-border] placeholder-gray-500 text-[--color-text-dark] rounded-md focus:outline-none focus:ring-[--color-primary] focus:border-[--color-primary] sm:text-sm"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none relative block w-full px-3 py-2 border border-[--color-border] placeholder-gray-500 text-[--color-text-dark] rounded-md focus:outline-none focus:ring-[--color-primary] focus:border-[--color-primary] sm:text-sm"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="appearance-none relative block w-full px-3 py-2 border border-[--color-border] placeholder-gray-500 text-[--color-text-dark] rounded-md focus:outline-none focus:ring-[--color-primary] focus:border-[--color-primary] sm:text-sm"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[--color-primary] hover:bg-[--color-primary-dark] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-primary]"
                        >
                            Sign up
                        </button>
                    </div>
                     <p className="text-center text-sm text-[--color-text-light]">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-[--color-primary] hover:text-[--color-primary-dark]">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
