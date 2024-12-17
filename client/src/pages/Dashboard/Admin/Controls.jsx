import React, { useState, useEffect } from 'react';
import { startElection, declareResults, isElectionStarted as checkElectionStatus, resultStatus, connectToBlockchain} from '../../../../contracts/Elections.js';

export default function Controls() {
    const [isElectionStarted, setIsElectionStarted] = useState(false);
    const [resultsDeclared, setResultsDeclared] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchElectionStatus = async () => {
        try {
            await connectToBlockchain();
            const started = await checkElectionStatus();
            setIsElectionStarted(started);
    
            const declared = await resultStatus();
            setResultsDeclared(declared);
        } catch (error) {
            console.error('Error fetching election status:', error);
            setErrorMessage('Failed to fetch election status.');
        }
    };

    // Fetch election status when the component mounts
    useEffect(() => {
        fetchElectionStatus();
    }, []);

    const handleStartElection = async () => {
        setLoading(true);
        setErrorMessage(''); // Clear previous error message

        try {
            await startElection();
            setIsElectionStarted(true);
            alert('Election started successfully!');
        } catch (error) {
            console.error('Error starting election:', error);
            setErrorMessage('Failed to start election.');
        } finally {
            setLoading(false);
        }
    };

    // Handle declare results action
    const handleDeclareResults = async () => {
        setLoading(true);
        setErrorMessage('');

        try {
            await connectToBlockchain();
            const resultsData = await declareResults();
            setResultsDeclared(true); // Update the results status
            localStorage.setItem('electionResults', JSON.stringify(resultsData));
            alert('Results declared successfully!');
        } catch (error) {
            console.error('Error declaring results:', error);
            setErrorMessage('Failed to declare results.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <h2 className="text-2xl font-bold mb-4">Election Controls</h2>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="flex gap-4">
                {/* Start Election Button */}
                <button
                    onClick={handleStartElection}
                    className={`w-48 p-4 text-lg font-bold text-white rounded-lg ${isElectionStarted ? 'bg-red-500' : 'bg-green-500 hover:bg-green-600'} focus:outline-none`}
                    disabled={isElectionStarted || loading} // Disable if loading or already started
                >
                    {loading ? 'Starting...' : isElectionStarted ? 'Election Started' : 'Start Election'}
                </button>
                {/* Declare Results Button */}
                <button
                    onClick={handleDeclareResults}
                    className={`w-48 p-4 text-lg font-bold text-white rounded-lg ${isElectionStarted && !resultsDeclared ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-500 cursor-not-allowed'}`}
                    disabled={!isElectionStarted || resultsDeclared || loading} // Disable if not started or already declared results
                >
                    {loading ? 'Declaring...' : resultsDeclared ? 'Results Declared' : 'Declare Results'}
                </button>
            </div>
        </div>
    );
}
