import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import DropDown from './dropdown';
import ProfileAvatar from './profile';

interface User {
    id: string;
    username: string;
    email: string;
    role: string;
}

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
            setIsAuthenticated(true);
            setUser(JSON.parse(userData));
        }
    }, []);

    const toggleMenu = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        toast.info("You have been logged out successfully");
        window.location.href = '/';
    };

    return (
        <div className="nav-bar flex h-[58px] p-5 m-5 rounded-lg backdrop-blur-lg border-[1px] border-black justify-between items-center relative z-50">
            <div className="glow-contain blur-lg absolute">
                <div className="glow"></div>
            </div>
            <div className="brand-logo">
                <Link to="/" className="font-[Unbounded] text-white relative z-10 hover:text-purple-400 transition-colors">Cosmic Horizons</Link>
            </div>
            <div className="nav-links hidden md:flex space-x-6">
                <Link to="/" className="text-gray-300 hover:text-purple-400 transition-colors">Home</Link>
                <div className="relative group">
                    <button className="text-gray-300 hover:text-purple-400 transition-colors flex items-center">
                        Blogs
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
                        <Link to="/blogs" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400">
                            Read Blogs
                        </Link>
                        <Link to="/create-blog" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400">
                            Write Blog
                        </Link>
                    </div>
                </div>
                <Link to="/news" className="text-gray-300 hover:text-purple-400 transition-colors">News</Link>
                <Link to="/isro" className="text-gray-300 hover:text-purple-400 transition-colors">ISRO Updates</Link>
                <Link to="/space-weather" className="text-gray-300 hover:text-purple-400 transition-colors">Space Weather</Link>
                <Link to="/about" className="text-gray-300 hover:text-purple-400 transition-colors">About</Link>
            </div>

            <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                    <div className="relative">
                        <button
                            onClick={toggleMenu}
                            className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-semibold">
                                {user?.username?.charAt(0).toUpperCase()}
                            </div>
                            <span>{user?.username}</span>
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-700 z-50">
                                <div className="py-1">
                                    <Link to="/profile" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400">
                                        Profile
                                    </Link>
                                    <Link to="/create-blog" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400">
                                        Write a Blog
                                    </Link>
                                    {user?.role === 'admin' && (
                                        <Link to="/admin" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400">
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex space-x-4">
                        <Link
                            to="/signin"
                            className="text-gray-300 hover:text-purple-400 transition-colors"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>

            <div className="md:hidden relative">
                <button id="hamburger" className="text-white focus:outline-none" onClick={toggleMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-lg border border-gray-700">
                    <div className="py-1">
                        <Link to="/" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400">
                            Home
                        </Link>
                        <div className="border-t border-gray-700 my-2"></div>
                        <Link to="/blogs" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400">
                            Read Blogs
                        </Link>
                        <Link to="/create-blog" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400">
                            Write Blog
                        </Link>
                        <div className="border-t border-gray-700 my-2"></div>
                        <Link to="/news" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400">
                            News
                        </Link>
                        <Link to="/isro" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400">
                            ISRO Updates
                        </Link>
                        <Link to="/space-weather" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400">
                            Space Weather
                        </Link>
                        <Link to="/about" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400">
                            About
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <div className="border-t border-gray-700 my-2"></div>
                                <Link to="/profile" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400">
                                    Profile
                                </Link>
                                {user?.role === 'admin' && (
                                    <Link to="/admin" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400">
                                        Admin Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="border-t border-gray-700 my-2"></div>
                                <Link to="/signin" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400">
                                    Sign In
                                </Link>
                                <Link to="/signup" className="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-purple-400">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
