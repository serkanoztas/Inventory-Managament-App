import React from 'react'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Login = () => {

    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
            if (response.data.success) {
                await login(response.data.user, response.data.token);
                if (response.data.user.role === 'admin') {
                    navigate('/admin-dashboard');
                }
                else {
                    navigate('/customer-dashboard');
                }
            }
            else {
                alert(response.data.error);
            }
        }
        catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <div className='min-h-screen items-center justify-center bg-gradient-to-b from-violet-600 from-50% to-gray-200 to-50% flex flex-col'>
            <h2 className='text-xl sm:text-3xl font-bold font-serif mb-8 text-white'>Inventory Management App</h2>
            <form onSubmit={handleLogin} className='w-full flex items-center justify-center'>
                <div className='max-w-[300px] lg:w-1/3 lg:h-1/2 flex flex-col items-center justify-center gap-5 border border-gray-300 rounded-md p-8 mx-auto bg-white shadow-lg'>
                    <h1 className='text-2xl font-bold font-serif'>LOGIN</h1>
                    {error && <div className='bg-red-100 text-red-700 p-2 rounded-md w-full text-center'>{error}</div>}
                    <h1 className='text-lg font-semibold'>Email</h1>
                    <input value={email} required onChange={(e) => setEmail(e.target.value)} className='border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' type="email" placeholder='Email' />
                    <h1 className='text-lg font-semibold'>Password</h1>
                    <input value={password} required onChange={(e) => setPassword(e.target.value)} className='border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500' type="password" placeholder='Password' />
                    <button className='bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-blue-500' type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login