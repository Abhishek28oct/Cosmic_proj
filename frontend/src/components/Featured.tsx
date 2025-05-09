import React from 'react';
import { useNavigate } from "react-router-dom";
import bgImage from '../assets/images/a3.jpeg';
import { FaCloudSun } from 'react-icons/fa';

const Featured: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* Featured Section Starts  */}
        <div className="flex items-center justify-center h-fit backdrop-blur-md py-10">
          <div className="w-[85%] flex flex-wrap justify-center items-center px-4 gap-8">
            {/* Image Section */}
            <div className="artbox relative">
              <div className="art-img rounded-3xl overflow-hidden shadow-lg max-[1000px]:w-[80vw] bg-cover"  style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="feat-img w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] object-cover" />
              </div>
            </div>
            {/* Content Section */}
            <div className="text-white space-y-6 flex-1">
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight pb-4 font-[Lexend]">
                Unleash Your Curiosity Among the Stars and Explore the Infinity
              </h1>
              {/* Card Section */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-6 font-[Lexend]">
                <h2 className="text-xl font-medium mb-2">
                  Infinite Horizons: Unravel the Universe
                </h2>
                <p className="text-gray-400">
                  Craft stellar designs to share your astronomical discoveries,
                  promote stargazing events, or inspire others with the wonders
                  of the universe.
                </p>
              </div>
              {/* Space Weather Section */}
              <div className="bg-gradient-to-r from-purple-800 to-purple-700 rounded-2xl p-6 font-[Lexend] cursor-pointer hover:from-purple-700 hover:to-purple-600 transition-all duration-300" onClick={() => navigate('/space-weather')}>
                <div className="flex items-center gap-3 mb-2">
                  <FaCloudSun className="text-2xl" />
                  <h2 className="text-xl font-medium">
                    Space Weather Forecast
                  </h2>
                </div>
                <p className="text-gray-200">
                  Get real-time space weather predictions and stargazing recommendations
                  powered by machine learning. Plan your astronomical observations
                  with confidence.
                </p>
              </div>
              {/* Join Section */}
              <div className="pt-4 font-[Lexend]">
                <h3 className="text-lg font-semibold uppercase tracking-wide text-gray-300">
                  Join Now
                </h3>
                <p className="text-gray-400 mt-2">
                  Join a global community of explorers and ignite your passion
                  for the cosmos through innovative tools and educational
                  resources.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Featured Section Ends */}
        </>
    );
};
export default Featured;
