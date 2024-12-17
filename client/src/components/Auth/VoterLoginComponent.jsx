import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VoterLoginComponent({ title }) {
    const [otpSent, setOtpSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState(null);
    const otpRef = useRef(null);
    const aadharRef = useRef(null);
    const navigate = useNavigate();

    // On component mount, check if voter is already logged in
    useEffect(() => {
        const voterData = JSON.parse(localStorage.getItem('voterData'));
        if (voterData?.isLogin) {
            navigate("/voterDashboard");
        }
    }, [navigate]);
    

    const validateOTP = async () => {
        const otpValue = otpRef.current.value.trim();
        if (!otpValue) {
            setErrorMessage('Please enter the OTP.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/verifyCode', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ aadhar: aadharRef.current.value.trim(), code: otpValue }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('OTP verified successfully');
                // Save user data to localStorage
                localStorage.setItem('voterData', JSON.stringify({
                    isLogin: true,
                    phone: data.phone,
                    aadhar: aadharRef.current.value.trim(),
                    name: data.name,
                    dob: data.dob,
                }));
                navigate("/voterDashboard");
            } else {
                setErrorMessage(data.message || 'Failed to verify OTP');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const validateLogin = async () => {
        const aadharNum = aadharRef.current.value.trim();
        if (!aadharNum || aadharNum.length !== 12) {
            setErrorMessage('Please enter a VALID Aadhar Number.');
            return;
        }
        
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/validateVoter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ aadhar: aadharNum }),
            });

            const data = await response.json();
            if (response.ok && data.phone) {
                // Save Aadhar and phone to localStorage
                localStorage.setItem('voterData', JSON.stringify({
                    phone: data.phone,
                    aadhar: aadharNum
                }));
                setPhone(data.phone);
                setOtpSent(true);
                setErrorMessage(`OTP successfully sent to your registered mobile number - ${data.phone}`);
            } else {
                setErrorMessage(data.message || 'Failed to send OTP');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center border rounded-lg p-4 max-w-md mx-auto'>
            <span className='text-5xl m-2'>{title}</span>
            <input
                type="text"
                placeholder='Enter Aadhar Number'
                className='mb-4 w-full p-2 border rounded bg-transparent text-black border-orange-400 focus:outline-none focus:border-[3px]'
                ref={aadharRef}
            />
            {otpSent && (
                <input
                    type="text"
                    placeholder='Enter OTP'
                    className='mb-4 w-full p-2 border border-orange-400 rounded bg-transparent text-black focus:outline-none focus:border-[3px]'
                    ref={otpRef}
                />
            )}
            {errorMessage && (
                <div className={`mt-4 ${otpSent ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                    {errorMessage}
                </div>
            )}

            <button
                onClick={otpSent ? validateOTP : validateLogin}
                type='button'
                className={`relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 hover:text-white focus:ring-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
            >
                <span className="relative px-5 py-2.5 bg-orange-100 text-black rounded-md">
                    {loading ? 'Processing...' : otpSent ? "Verify OTP" : "Log In"}
                </span>
            </button>
        </div>
    );
}
