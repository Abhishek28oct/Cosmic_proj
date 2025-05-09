import React from 'react';
import { useNavigate } from "react-router-dom";


const IndexHero: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* Hero Section Starts  */}
        <div className="hero flex flex-col min-h-fit h-[80vh] w-[85vw] rounded-[35px] m-5 p-5 border-[1px] border-black overflow-hidden m-auto backdrop-blur-sm justify-center items-center">
          {/* Background Planet */}
          <div className="circle-contain blur-md">
            <div className="glow-circle">
              <div className="semicircle" />
              <div className="ring" />
            </div>
          </div>
          <div className="article w-full flex justify-center items-center relative z-2">
            {/* Typography  */}
            <div className="typo font-[Unbounded]  flex flex-col text-center h-fit py-8">
              <p className="text-5xl text-white sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl">
                Explore the Boundless Cosmos
              </p>
              <p className="text-4xl text-white sm:text-3xl md:text-4xl lg:text-5xl">
                Step Beyond the Horizon
              </p>
              <p className="text-xl text-white font-[Montserrat]">
                Discover the mysteries of the universe with a single click.
              </p>
            </div>
          </div>
          {/* Links */}
          <div className="link relative z-3">
            <button
              type="button"
              className="art-btn backdrop-blur-lg  py-2 px-5 rounded-full mx-1 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:opacity-85  font-[Montserrat] text-white text-sm lg:text-md xl:text-md"
              onClick={() => navigate("/blog")}
            >
              Read Blogs
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="art-btn backdrop-blur-lg  py-2 px-5 rounded-full mx-1 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:opacity-85 font-[Montserrat] text-white text-sm lg:text-md xl:text-md"
            >
              Get Started
            </button>
          </div>
        </div>
        {/* Hero Section Ends */}
        </>
    );
};
export default IndexHero;
