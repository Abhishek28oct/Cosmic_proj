import React from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../App.css';

const About: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            
            {/* Hero Section */}
            <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black z-10"></div>
                <div className="relative z-20 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Your Gateway to the Universe
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Welcome Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-purple-400">Welcome to Cosmic Horizons</h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-6">
                        At Cosmic Horizons, we believe the universe belongs to everyone. Whether you're a curious beginner or a seasoned stargazer, our platform is designed to bring the wonders of the cosmos closer to you. We are passionate about making astronomy accessible, engaging, and inspiring for people of all ages and backgrounds.
                    </p>
                </div>

                {/* Mission Section */}
                <div className="mb-16 bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700">
                    <h2 className="text-3xl font-bold mb-6 text-purple-400">Our Mission</h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        To ignite curiosity about space, foster a love for astronomy, and build a global community of enthusiasts united by the desire to explore the universe.
                    </p>
                </div>

                {/* What We Offer Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-purple-400">What We Offer</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                            <h3 className="text-xl font-semibold mb-4 text-purple-400">Curated Content</h3>
                            <p className="text-gray-300">
                                Stay informed with up-to-date blogs, space news, and insights from the astronomical world.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                            <h3 className="text-xl font-semibold mb-4 text-purple-400">Interactive Tools</h3>
                            <p className="text-gray-300">
                                Use our night sky maps, guides, and visual aids to make every stargazing session unforgettable.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                            <h3 className="text-xl font-semibold mb-4 text-purple-400">Community Connection</h3>
                            <p className="text-gray-300">
                                Share your passion, ask questions, and connect with like-minded explorers from around the world.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                            <h3 className="text-xl font-semibold mb-4 text-purple-400">Educational Resources</h3>
                            <p className="text-gray-300">
                                Dive into structured learning paths, download printables, and expand your knowledge of the cosmos.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Final Message */}
                <div className="text-center">
                    <p className="text-lg text-gray-300 leading-relaxed italic">
                        Cosmic Horizons isn't just a website — it's a journey into the stars. Whether you're chasing meteor showers, tracking planets, or simply marveling at the night sky, we're here to guide and grow with you.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default About; 