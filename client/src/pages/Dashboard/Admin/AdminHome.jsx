import React, { useEffect, useState } from 'react';
import { connectToBlockchain } from '../../../../contracts/Elections.js';

export default function AdminHome() {
    const [adminData, setAdminData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        // Check if the user is already connected to the blockchain
        const fetchBlockchainConnection = async () => {
            try {
                await connectToBlockchain();
                console.log("Connected to the blockchain successfully.");
            } catch (error) {
                console.error("Failed to connect to the blockchain:", error);
            }
        };

        fetchBlockchainConnection();

        // Retrieve admin data from localStorage when the component mounts
        const storedData = JSON.parse(localStorage.getItem('adminData'));
        if (storedData) {
            setAdminData(storedData);
        }
    }, []); // effect runs once when the component mounts

    return (
        <div className="flex flex-col gap-4 p-4 items-center">
            {/* Admin Data Card */}
            <div className="flex flex-col gap-10 lg:flex-row">
                <div className="w-full max-w-sm bg-pink-50 border-[2px] border-pink-300 rounded-lg shadow">
                    <div className="flex flex-col items-center p-50 m-12">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg bg-white" src="https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png" alt="Profile"/>
                        <h5 className="mb-1 text-xl font-bold text-gray-800">{adminData.name}</h5>
                        <span className="text-lg font-semibold text-red-600">{adminData.phone}</span>
                        <span className="text-lg font-semibold text-red-600">{adminData.email}</span>
                    </div>
                </div>
            </div>

            {/* Instructions Section */}
            <div className="w-full max-w-4xl bg-gray-100 border-[2px] border-gray-300 rounded-lg shadow-lg p-6 mt-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">Instructions..</h2>
                <ul className="list-disc list-inside text-lg font-light space-y-2">
                    <li><b>Wallet Setup</b>: Ensure MetaMask or another compatible wallet is installed on your browser.</li>
                    <li>
                        <b>Control Page Guidance</b>:
                        <ul className="list-disc list-inside ml-5">
                            <li>Select your admin wallet account in the Controls page to perform operations.</li>
                            <li>If buttons are not updating, try refreshing the page.</li>
                        </ul>
                    </li>
                    <li><b>Troubleshooting</b>: If you encounter errors on any page, try refreshing the page once.</li>
                    <li>For additional technical support, contact <a href="mailto:238w5a1201@vrsec.ac.in" className="text-blue-500 underline">238w5a1201@vrsec.ac.in</a>.</li>
                </ul>
            </div>
        </div>
    );
}
