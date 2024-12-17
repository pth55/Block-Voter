import React, { useEffect, useState } from 'react';
import { connectToBlockchain, getCandidates, addVote, checkIfVoted, isElectionStarted, resultStatus, getWinner, getVoterChoice } from '../../../../contracts/Elections.js'; 
import Party1 from "../../../../src/assets/party1.png";
import Party2 from "../../../../src/assets/party2.png";
import Party3 from "../../../../src/assets/party3.png";
import Party4 from "../../../../src/assets/party4.png";

const VoteNow = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [hasVotedState, setHasVotedState] = useState(false); 
    const [electionStarted, setElectionStarted] = useState(false); 
    const [resultsDeclared, setResultsDeclared] = useState(false);
    const [winner, setWinner] = useState(null);
    const [voteStatusMessage, setVoteStatusMessage] = useState('');
    const [votedParty, setVotedParty] = useState('');

    const voterData = JSON.parse(localStorage.getItem('voterData')); 
    const aadhaarNumber = voterData?.aadhar; 

    const partyLogos = {
        Party1: Party1,
        Party2: Party2,
        Party3: Party3,
        Party4: Party4,
    };

    // Combined function to fetch candidates, check voting status, and election status
    const fetchData = async () => {
        try {
            await connectToBlockchain();
            const candidateList = await getCandidates();
            console.log("Fetched Candidates:", candidateList);

            const formattedCandidates = candidateList.map(candidate => ({
                ...candidate,
                candidate_voteCount: typeof candidate.candidate_voteCount === 'bigint' 
                    ? candidate.candidate_voteCount.toString() 
                    : candidate.candidate_voteCount,
            }));

            setCandidates(formattedCandidates);

            // Check if election has started
            const started = await isElectionStarted();
            setElectionStarted(started);

            // Check if results are declared
            const declared = await resultStatus();
            setResultsDeclared(declared);

            if (declared) {
                const winnerData = await getWinner();
                setWinner(winnerData);
            }

            if (aadhaarNumber) {
                const voted = await checkIfVoted(aadhaarNumber); // Check if the user has voted
                setHasVotedState(voted);

                if (voted) {
                    const partyName = await getVoterChoice();  // Get the party that the voter voted for
                    setVotedParty(partyName); // Store the party name

                    if (declared) {
                        // Show the winner if the results are declared
                        const winnerData = await getWinner();
                        // Check if the message already contains "Please wait for the results."
                        if (!voteStatusMessage.includes("Please wait for the results.")) {
                            setVoteStatusMessage(
                                <>
                                    The winner is <span className="text-green-600 font-semibold">{winnerData.candidate_name}</span> from 
                                    <span className="text-green-600 font-semibold"> {winnerData.candidate_partyName}</span>. 
                                    Votes: <span className="text-green-600 font-semibold"> {winnerData.candidate_voteCount.toString()}</span>
                                    <br/>
                                    You have voted for <span className="text-green-600 font-semibold">{partyName}</span>.
                                    
                                </>
                            );
                        }
                    } else {
                        // Only set the message if it hasn't been set already
                        if (!voteStatusMessage.includes("Please wait for the results.")) {
                            setVoteStatusMessage(
                                <>
                                    You have voted for <span className="text-green-600 font-semibold">{partyName}</span>. 
                                    Please wait for the results.
                                </>
                            );
                        }
                    }
                }
            }
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to fetch data: ' + (err.message || 'Unknown error'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleVote = async (index) => {
        const candidateId = index + 1;
        try {
            await addVote(candidateId, aadhaarNumber);
            setHasVotedState(true); // Update the voting status after voting
        } catch (err) {
            console.error('Error during voting:', err);
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 items-center">
            {resultsDeclared && winner ? <h2 className="text-3xl font-bold text-blue-500 mb-4">Results Declared!</h2> : <h1 className="text-3xl font-bold mb-4">All Candidates</h1>}

            {loading && <p>Loading candidates...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Display message if election hasn't started */}
            {!electionStarted && !resultsDeclared && !loading && (
                <h2 className="text-3xl font-bold text-center text-red-500">
                    Elections have not started.
                </h2>
            )}

            {/* Display results if declared */}
            {resultsDeclared && winner && (
                <div className="w-full max-w-lg bg-blue-50 border-[3px] border-blue-300 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 mt-10">
                    {/* {setVoteStatusMessage('')} */}
                    <div className="flex flex-col items-center p-6">
                    <h1 className="text-3xl font-bold text-black mb-4">Winner!</h1>
                    {partyLogos[formatPartyLogo(winner.candidate_partyLogo)] || null ? (
                        <img
                        src={partyLogos[formatPartyLogo(winner.candidate_partyLogo)]}
                        alt={`${winner[3]}'s logo`}
                        className="w-28 h-28 mb-3 rounded-xl"
                        />
                    ) : (
                        <span>No logo available</span>
                    )}
                    <div className="flex flex-col py-3 items-center mt-4 bg-blue-200 w-full rounded-xl">
                        <span className="text-lg font-semibold text-gray-700">Voters Count</span>
                        <span className="text-5xl font-semibold text-orange-700">{winner.candidate_voteCount.toString()}</span>
                        <h5 className="mb-1 text-xl pt-3 font-medium text-green-600">{winner.candidate_partyName}</h5>
                        <span className="text-lg font-semibold text-gray-700">{winner.candidate_name}</span>
                    </div>
                    </div>
                </div>
            )}

            {/* Display vote cards if election is started and results are not declared */}
            {!resultsDeclared && electionStarted && (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
                    {candidates.map((candidate, index) => {
                        const formattedLogoName = formatPartyLogo(candidate.candidate_partyLogo);
                        const logoImage = partyLogos[formattedLogoName] || null;

                        return (
                            <div key={index} className="w-full max-w-sm bg-blue-50 border-[2px] border-blue-300 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
                                <div className="flex flex-col items-center p-6">
                                    {logoImage ? (
                                        <img
                                            src={logoImage}
                                            alt={`${candidate.candidate_partyName}'s logo`}
                                            className="w-28 h-28 mb-3 rounded-xl"
                                        />
                                    ) : (
                                        <span>No logo available</span>
                                    )}
                                    <h5 className="mb-1 text-xl font-medium text-gray-800">{candidate.candidate_partyName}</h5>
                                    <span className="text-lg font-semibold text-red-700">{candidate.candidate_name}</span>
                                    {!hasVotedState ? (
                                        <button
                                            onClick={() => handleVote(index)}
                                            className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Vote Now
                                        </button>
                                    ) : null} {/* Hide the "Vote Now" button if the user has already voted */}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {hasVotedState && (
                <p className="text-red-500 mt-4 text-lg font-semibold">
                    {voteStatusMessage}
                </p>
            )}
        </div>
    );
};

const formatPartyLogo = (partyLogo) => {
    const formattedName = partyLogo.split('.')[0];
    return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
};

export default VoteNow;
