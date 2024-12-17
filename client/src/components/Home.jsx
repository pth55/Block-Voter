import React, { useState, useEffect } from 'react';
import Img1 from "../assets/img1.png";
import Party1 from "../assets/party1.png";
import Party2 from "../assets/party2.png";
import Party3 from "../assets/party3.png";
import Party4 from "../assets/party4.png";
import { Link } from 'react-router-dom';
import NavBar from "./NavBar/NavBar";
import { connectToBlockchain, getCandidates, resultStatus } from '../../contracts/Elections';

// Party logos for display
const partyLogos = {
  Party1: Party1,
  Party2: Party2,
  Party3: Party3,
  Party4: Party4,
};

const Home = () => {
  const [resultsDeclared, setResultsDeclared] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState('');

  // Fetch results and candidates when the component mounts
  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Connect to the blockchain
        await connectToBlockchain();
        
        // Check if results are declared
        const declared = await resultStatus();
        setResultsDeclared(declared);

        if (declared) {
          // Fetch all candidates
          const fetchedCandidates = await getCandidates();
          
          // Sort candidates by vote count in descending order
          const sortedCandidates = fetchedCandidates.sort((a, b) => {
            return Number(b.candidate_voteCount.toString()) - Number(a.candidate_voteCount.toString());
          });
          
          setCandidates(sortedCandidates);
        }
      } catch (error) {
        console.error("Failed to fetch results:", error);
        setError('Error fetching candidates or election results');
      }
    };

    fetchResults();
  }, []);

  // Helper function to format party logo name
  const formatPartyLogo = (partyLogo) => {
    const formattedName = partyLogo.split('.')[0];
    return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
  };

  return (
    <div className="relative overflow-hidden">
      <NavBar />
      <div className="flex flex-col items-center justify-center pt-[5rem] pb-[2rem]">
        <div className="flex flex-col items-center justify-center gap-10 w-full px-4">
          <img src={Img1} alt="Emblem" className="w-full md:w-[50%] mt-0" />
          <Link to="/voterLogin">
            <button className="mt-0 px-4 py-2 md:px-8 md:py-5 bg-[#FFA500] hover:bg-transparent text-white font-bold text-lg rounded-full border-[2px] border-orange-400 hover:text-black transition-transform focus:outline-none">
              VOTE NOW ✅
            </button>
          </Link>
        </div>

        {resultsDeclared && candidates.length > 0 && (
          <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 mt-10">
            <div className="flex flex-col gap-8 items-center">
              {/* Display Winner as the first card */}
              <div className="w-full max-w-md bg-orange-50 border-[3px] border-orange-300 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="flex flex-col items-center p-4">
                  <h1 className="text-2xl font-bold text-black mb-3">Winner!</h1>
                  <img
                    src={partyLogos[formatPartyLogo(candidates[0].candidate_partyLogo)] || ''}
                    alt={`${candidates[0].candidate_partyName}'s logo`}
                    className="w-24 h-24 mb-3 rounded-xl"
                  />
                  <div className="flex flex-col py-3 items-center mt-4 bg-orange-200 w-full rounded-xl">
                    <span className="text-sm font-semibold text-gray-700">Voters Count</span>
                    <span className="text-4xl font-semibold text-orange-700">{candidates[0].candidate_voteCount.toString()}</span>
                    <h5 className="mb-1 text-lg pt-3 font-medium text-green-600">{candidates[0].candidate_partyName}</h5>
                    <span className="text-sm font-semibold text-gray-700">{candidates[0].candidate_name}</span>
                  </div>
                </div>
              </div>

              {/* Display Remaining Candidates in rows */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                {candidates.slice(1).map((candidate, index) => {
                  const formattedLogoName = formatPartyLogo(candidate.candidate_partyLogo);
                  const logoImage = partyLogos[formattedLogoName] || null;
                  return (
                    <div key={index} className="w-full max-w-sm bg-red-50 border-[3px] border-red-300 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
                    <div className="flex flex-col items-center p-6">
                      <img
                        src={logoImage} 
                        alt={`${candidate.candidate_partyName}'s logo`}
                        className="w-20 h-20 mb-3 rounded-xl"
                      />
                      <div className="flex flex-col py-2 items-center mt-2 bg-red-200 w-full rounded-xl">
                        <span className="text-base font-semibold text-gray-700">Voters Count</span>
                        <span className="text-3xl font-semibold text-red-700">{candidate.candidate_voteCount.toString()}</span>
                        <h5 className="mb-1 text-lg pt-3 font-medium text-green-600">{candidate.candidate_partyName}</h5>
                        <span className="text-base font-semibold text-gray-700">{candidate.candidate_name}</span>
                      </div>
                    </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Home;
