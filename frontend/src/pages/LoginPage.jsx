// src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as loginApi } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await loginApi({ email, password });
            login(response.data);
            navigate('/');
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[--color-bg] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-[--color-text-dark]">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6 bg-[--color-card] p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-4 rounded-md bg-red-50 text-sm text-[--color-error]">
                            {error}
                        </div>
                    )}
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[--color-border] placeholder-gray-500 text-[--color-text-dark] rounded-t-md focus:outline-none focus:ring-[--color-primary] focus:border-[--color-primary] focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[--color-border] placeholder-gray-500 text-[--color-text-dark] rounded-b-md focus:outline-none focus:ring-[--color-primary] focus:border-[--color-primary] focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[--color-primary] hover:bg-[--color-primary-dark] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--color-primary]"
                        >
                            Sign in
                        </button>
                    </div>
                    <p className="text-center text-sm text-[--color-text-light]">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-[--color-primary] hover:text-[--color-primary-dark]">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
