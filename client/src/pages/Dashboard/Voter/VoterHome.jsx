import React, { useEffect, useState } from 'react';
import { connectToBlockchain } from '../../../../contracts/Elections.js';

export default function VoterHome() {
    const [voterData, setVoterData] = useState(null);

    // Load voter data from localStorage when the component mounts
    useEffect(() => {
        const storedData = localStorage.getItem('voterData');
        if (storedData) {
            setVoterData(JSON.parse(storedData));
        }

        const fetchBlockchainConnection = async () => {
            try {
                await connectToBlockchain();
                console.log("Connected to the blockchain successfully.");
            } catch (error) {
                console.error("Failed to connect to the blockchain:", error);
            }
        };

        fetchBlockchainConnection();
    }, []); // This runs once when the component is mounted

    // Ensure that voterData is loaded before rendering
    if (!voterData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-4 p-4 items-center">
            <div className="flex flex-col gap-10 lg:flex-row">
                <div className="w-full max-w-sm bg-blue-50 border-[2px] border-blue-300 rounded-xl shadow-lg">
                    <div className="flex flex-col items-center p-6 m-4">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg bg-white" src="https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png" alt="User Profile"/>
                        <h5 className="mb-1 text-xl font-semibold text-gray-800">{voterData?.name}</h5>
                        <div className="flex flex-col items-center w-full px-4">
                            <span className="text-base text-red-400"><b>Phone: </b>{voterData?.phone}</span>
                            <span className="text-base text-red-400"><b>Aadhar: </b>{voterData?.aadhar}</span>
                            <span className="text-base text-red-400"><b>DOB: </b>{voterData?.dob}</span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Additional Instructions Section */}
            <div className="w-full max-w-4xl bg-white-100 border-[2px] border-gray-300 rounded-xl shadow-lg p-5 mt-6">
                <h1 className="text-2xl font-bold text-blue-600 mb-6 text-center">Instructions..</h1>
                <div className="mb-8 p-4 border-l-4 border-blue-500 bg-blue-50">
                    <p className="mb-2">
                        <strong>Wallet Requirement:</strong> Install MetaMask (or another compatible wallet) on your browser.
                    </p>
                    
                    <p className="mb-2">
                        <strong>Voting Limitations:</strong> You cannot vote more than once with the same Aadhaar number and wallet address.
                    </p>
                    
                    <p className="mb-2">
                        <strong>Troubleshooting:</strong>
                        <ul className="list-disc ml-5">
                            <li>If you encounter issues on any dashboard page, try refreshing the page.</li>
                            <li>If you are unable to vote due to an Aadhaar or wallet issue, you may have already voted. Contact support if necessary.</li>
                        </ul>
                    </p>
                    
                    <p className="mb-2">
                        <strong>After Voting:</strong> After completing your vote, log out and disconnect your wallet properly.
                    </p>
                </div>
            </div>
        </div>
    );
}
