
import React from 'react';

const WelcomeSection = () => {
  return (
    <div className="bg-white p-6 mb-6 rounded-md shadow-sm flex justify-between">
      <div>
        <h1 className="text-xl font-medium text-alif-green mb-2">Welcome to AMSIS !</h1>
        <p className="text-gray-500">May your experience be enjoyable and productive.</p>
        <button className="mt-4 px-4 py-2 border border-alif-green text-alif-green rounded-md hover:bg-alif-green hover:text-white transition-all">
          Explore
        </button>
      </div>
      <div>
        <img 
          src="/lovable-uploads/4570c0d5-09d4-499e-b67c-6beebbf48b8e.png" 
          alt="Welcome illustration" 
          className="h-32"
        />
      </div>
    </div>
  );
};

export default WelcomeSection;
