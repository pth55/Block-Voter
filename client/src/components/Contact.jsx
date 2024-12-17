import React from 'react';

function Contact() {
  return (
    <div className="min-h-fit py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-12">
          Have any questions, feedback, or issues? Reach out to our development team. We’re here to help ensure you have a seamless experience with our Full-Stack E-Voting DApp.
        </p>
      </div>

      {/* Contact Details */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 items-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center items-center">Contact Information</h2>
        <p className="text-gray-900 text-lg text-center mb-8">Contact the team directly for bug reports, feedback, and technical support:</p>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 items-center">
          {/* Team Member 1 */}
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow duration-300">
            <h4 className="text-xl font-semibold text-gray-800">B. Pavan Kumar</h4>
            <p className="text-gray-700 mb-2">Full Stack / Blockhain Dev.</p>
            <a href="mailto:238w5a1201@vrsec.ac.in" className="text-blue-500 hover:underline hover:font-semibold">238w5a1201@vrsec.ac.in</a>
          </div>
          
          {/* <div className="bg-gray-100 p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow duration-300">
            <h4 className="text-xl font-semibold text-gray-800">John Smith</h4>
            <p className="text-gray-600 mb-2">Full Stack Developer</p>
            <a href="mailto:john.smith@evotingdapp.com" className="text-blue-500 underline">
              john.smith@evotingdapp.com
            </a>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow duration-300">
            <h4 className="text-xl font-semibold text-gray-800">Sarah Lee</h4>
            <p className="text-gray-600 mb-2">Smart Contract Engineer</p>
            <a href="mailto:sarah.lee@evotingdapp.com" className="text-blue-500 underline">
              sarah.lee@evotingdapp.com
            </a>
          </div> */}

        </div>
      </div>
    </div>
  );
}

export default Contact;
