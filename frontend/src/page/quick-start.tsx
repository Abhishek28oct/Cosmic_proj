import React from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../App.css';

const QuickStart: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            
            {/* Hero Section */}
            <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black z-10"></div>
                <div className="relative z-20 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Quick Start Guide</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Get started with Cosmic Horizons in minutes
                    </p>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700">
                    <h2 className="text-2xl font-bold mb-6 text-purple-400">Coming Soon</h2>
                    <p className="text-gray-300">
                        Our quick start guide is currently being developed. Soon you'll have access to step-by-step instructions to help you get the most out of Cosmic Horizons from day one.
                    </p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default QuickStart; 