import React from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../App.css';

const Features: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            
            {/* Hero Section */}
            <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black z-10"></div>
                <div className="relative z-20 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Features</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Discover the tools and resources that make Cosmic Horizons your ultimate space companion
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Night Sky Map */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-purple-400">Night Sky Map</h3>
                        <p className="text-gray-300">
                            Interactive star maps with real-time celestial object tracking, constellation guides, and event notifications.
                        </p>
                    </div>

                    {/* Learning Path */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-purple-400">Learning Path</h3>
                        <p className="text-gray-300">
                            Structured courses and tutorials for all levels, from beginner stargazers to advanced astronomers.
                        </p>
                    </div>

                    {/* Community Forum */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-purple-400">Community Forum</h3>
                        <p className="text-gray-300">
                            Connect with fellow space enthusiasts, share observations, and participate in discussions.
                        </p>
                    </div>

                    {/* Event Calendar */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-purple-400">Event Calendar</h3>
                        <p className="text-gray-300">
                            Stay updated with upcoming celestial events, meteor showers, and astronomical phenomena.
                        </p>
                    </div>

                    {/* Mobile App */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-purple-400">Mobile App</h3>
                        <p className="text-gray-300">
                            Access all features on the go with our comprehensive mobile application.
                        </p>
                    </div>

                    {/* API Access */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-purple-400">API Access</h3>
                        <p className="text-gray-300">
                            Integrate our data and features into your own applications with our comprehensive API.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Features; 