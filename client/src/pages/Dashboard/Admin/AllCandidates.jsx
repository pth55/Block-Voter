import React, { useEffect, useState } from 'react';
import { connectToBlockchain, getCandidates } from '../../../../contracts/Elections.js';
import Party1 from "../../../../src/assets/party1.png";
import Party2 from "../../../../src/assets/party2.png";
import Party3 from "../../../../src/assets/party3.png";
import Party4 from "../../../../src/assets/party4.png";

export default function AllCandidates() {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const partyLogos = {
        Party1: Party1,
        Party2: Party2,
        Party3: Party3,
        Party4: Party4,
    };

    const fetchCandidates = async () => {
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
        } catch (err) {
            console.error('Error fetching candidates:', err);
            setError('Failed to fetch candidates.');
        } finally {
            setLoading(false);
        }
    };

    function formatPartyLogo(partyLogo) {
        const formattedName = partyLogo.split('.')[0];
        return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
    }

    useEffect(() => {
        fetchCandidates();
    }, []);

    return (
        <div className="flex flex-col gap-4 p-4 items-center">
            <h1 className="text-2xl font-bold mb-4">All Candidates</h1>
            {loading && <p>Loading candidates...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {candidates.length === 0 && !loading && <p>No candidates found.</p>}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
                {candidates.map((candidate, index) => {
                    const formattedLogoName = formatPartyLogo(candidate.candidate_partyLogo);
                    const logoImage = partyLogos[formattedLogoName] || null;

                    return (
                        <div 
                            key={index} 
                            className="w-full max-w-xl bg-pink-50 border-[2px] border-pink-300 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
                        >
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
                                <div className="flex flex-col py-3 items-center mt-4 bg-pink-200 w-full rounded-xl">
                                    <span className="text-lg font-semibold text-gray-700">Current Vote Count</span>
                                    <span className="text-5xl font-semibold text-pink-700">{`${candidate.candidate_voteCount}`}</span>
                                </div>
                                <h5 className="mb-1 text-xl pt-3 font-medium text-green-600">{candidate.candidate_partyName}</h5>
                                <span className="text-lg font-semibold text-gray-700">{candidate.candidate_name}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
