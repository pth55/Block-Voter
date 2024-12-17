import React, { useState, useEffect } from 'react';
import { connectToBlockchain, addCandidate } from '../../../../contracts/Elections.js';

export default function AddCandidate() {
    const [candidateName, setCandidateName] = useState('');
    const [partyName, setPartyName] = useState('');
    const [partyLogo, setPartyLogo] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    // Connect to blockchain on component mount
    useEffect(() => {
        const initializeBlockchain = async () => {
            try {
                await connectToBlockchain();
            } catch (error) {
                setErrorMessage("Failed to connect to the blockchain. Please check MetaMask.");
                console.error("Blockchain connection error:", error);
            }
        };

        initializeBlockchain();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input fields
        if (!candidateName || !partyName || !partyLogo) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        // Optional URL validation for party logo
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
            '((([a-z\\d]{1,})([\\w-]{0,61}[a-z\\d]{1,})?\\.)+[a-z]{2,6})' + 
            '(\\:[0-9]{1,5})?(\\/[^\\s]*)?$', 'i'); 
        if (partyLogo && !urlPattern.test(partyLogo)) {
            setErrorMessage('Please enter a valid URL for the party logo.');
            return;
        }

        setLoading(true); // Set loading state
        try {
            await addCandidate(candidateName, partyName, partyLogo);
            setCandidateName('');
            setPartyName('');
            setPartyLogo('');
            setErrorMessage(null);
            setSuccessMessage('Candidate added successfully!');
        } catch (error) {
            setErrorMessage('Failed to add candidate. Please try again.');
            console.error("Error adding candidate:", error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 items-center">
            <div className="w-full max-w-md bg-pink border-[2px] border-pink-300 rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-4 text-center text-pink">Add Candidate</h2>
                {errorMessage && (
                    <div className="mb-4 text-red-500 font-semibold" aria-live="assertive">{errorMessage}</div>
                )}
                {successMessage && (
                    <div className="mb-4 text-green-500 font-semibold" aria-live="polite">{successMessage}</div>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Candidate Name"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Party Name"
                        value={partyName}
                        onChange={(e) => setPartyName(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Party Logo URL"
                        value={partyLogo}
                        onChange={(e) => setPartyLogo(e.target.value)}
                        className="p-2 border border-gray-300 rounded focus:outline-none focus:border-pink-500"
                        required
                    />
                    <button
                        type="submit"
                        className={`w-full p-2 ${loading ? 'bg-gray-400' : 'bg-pink-500'} text-white rounded hover:bg-pink-600 focus:outline-none focus:ring focus:ring-blue-300`}
                        disabled={loading} // Disable button during loading
                    >
                        {loading ? 'Adding...' : 'Add Candidate'}
                    </button>
                </form>
            </div>
        </div>
    );
}
