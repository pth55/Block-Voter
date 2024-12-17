import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLoginComponent({ title }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const uname = useRef(null);
    const pass = useRef(null);
    const navigate = useNavigate();

    // On component mount, check if admin is already logged in
    useEffect(() => {
        const adminData = JSON.parse(localStorage.getItem('adminData'));
        if (adminData?.isLogin) {
            navigate("/adminDashboard");
        }
    }, [navigate]);

    const validateLogin = async () => {
        const username = uname.current.value.trim();
        const password = pass.current.value.trim();
    
        if (!username || !password) {
            setErrorMessage('Please enter both username and password.');
            return;
        }
    
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/validateAdmin/${username}/${password}`, {
                method: 'GET',
            });
    
            const data = await response.json();
    
            if (!response.ok || !data.status) {
                setErrorMessage(data.message || 'Failed to validate admin');
            } else {
                setErrorMessage(null);
                localStorage.setItem('adminData', JSON.stringify({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    isLogin: true
                }));

                alert('Login successful');
                navigate("/adminDashboard");
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className='flex flex-col items-center justify-center border-[2px] rounded-lg p-4 max-w-md mx-auto'>
            <span className='text-4xl m-2'>{title}</span>
            <input
                type="text"
                placeholder='Username'
                className='mb-4 w-full p-2 border rounded bg-transparent text-black border-orange-400 focus:outline-none focus:border-[3px]'
                ref={uname}
            />
            <input
                type="password"
                placeholder='Password'
                className='mb-4 w-full p-2 border border-orange-400 rounded bg-transparent text-black focus:outline-none focus:border-[3px]'
                ref={pass}
            />
            {errorMessage && (
                <div className='mt-4 text-red-500 font-semibold'>{errorMessage}</div>
            )}
            <button
                onClick={validateLogin}
                type='button'
                className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-200`}
                disabled={loading}
            >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-orange-100 text-black rounded-md group-hover:bg-opacity-0">
                    {loading ? 'Processing...' : "Log In"}
                </span>
            </button>
        </div>
    );
}
