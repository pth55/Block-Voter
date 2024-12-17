import React from 'react';

function About() {
  return (
    <div className="p-8 min-h-fit">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Our Project</h1>
        <p className="text-lg text-gray-700 mb-12">
          Our Full-Stack E-Voting DApp is a blockchain-powered voting application that ensures a secure, transparent, and reliable voting experience.
          Built using the MERN stack with Solidity for smart contracts, this platform provides voters with decentralized, tamper-resistant voting capabilities.
          It is designed to empower voters to participate in voting processes with enhanced trust and ease of access.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-4xl mx-auto text-center mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-8">
          Our mission is to bring transparency and efficiency to the voting process by leveraging blockchain technology.
          We aim to create a decentralized platform that guarantees data integrity, voter privacy, and election credibility. 
          By doing so, we hope to foster trust in the electoral process and make voting accessible to all.
        </p>
      </div>

      {/* Team Section */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Team Members */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-800">P. Gayatri</h3>
            <p className="text-gray-600">228W1A1248 | Team Lead</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-800">B. Pavan Kumar</h3>
            <p className="text-gray-600">238W5A1201</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-gray-800">D. Bhanu Prakash</h3>
            <p className="text-gray-600">228W1A1218</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
