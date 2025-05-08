import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import ProfileAvatar from './profile';

const DropDown: React.FC = () => {
    // Get Full Name of User
    const fullName = "Abhijeet Srivastava";
    const userEmail = "abhijeet.afk@gmail.com";
    const [isAuthenticated, setIsAuthenticated] = useState(false); 

    const navigate = useNavigate();
    return (
        <>
            <div
                id="menu"
                className="absolute right-8 mt-[-30px] w-fit min-w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-700 z-50 font-light overflow-hidden"
            >
                <Link to="/" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400 transition-colors">Home</Link>
                <Link to="/blog" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400 transition-colors">Blogs</Link>
                <Link to="/news" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400 transition-colors">News</Link>
                <Link to="/isro" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400 transition-colors">ISRO Updates</Link>
                <Link to="/about" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400 transition-colors">About</Link>
                <div className="border-t border-gray-700 my-2"></div>
                
                {isAuthenticated ? (
                    <div className="flex p-3 pt-1 justify-between">
                        <ProfileAvatar />
                        <div className="flex flex-col text-gray-400 text-[13px] pl-2 justify-center">
                            <p>{fullName}</p>
                            <p>{userEmail}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link to="/signup" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400 transition-colors">Sign Up</Link>
                        <Link to="/signin" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400 transition-colors">Login</Link>  
                    </>
                )}
            </div>
        </>
    );
};

export default DropDown;
