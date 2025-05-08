import React from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../App.css';

const Pricing: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            
            {/* Hero Section */}
            <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black z-10"></div>
                <div className="relative z-20 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Pricing Plans</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Choose the perfect plan for your cosmic journey
                    </p>
                </div>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Free Plan */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">Free</h3>
                        <p className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-400">/month</span></p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Basic night sky maps
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Limited article access
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Community forum access
                            </li>
                        </ul>
                        <button className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            Get Started
                        </button>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-gradient-to-br from-purple-900/50 to-gray-800 p-8 rounded-xl border border-purple-500/50 hover:border-purple-500 transition-all duration-300 transform scale-105">
                        <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm">
                            Popular
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">Pro</h3>
                        <p className="text-4xl font-bold mb-6">$9.99<span className="text-lg text-gray-400">/month</span></p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Advanced night sky maps
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Full article access
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Priority support
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Exclusive content
                            </li>
                        </ul>
                        <button className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            Get Started
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                        <h3 className="text-2xl font-bold mb-4 text-purple-400">Enterprise</h3>
                        <p className="text-4xl font-bold mb-6">$29.99<span className="text-lg text-gray-400">/month</span></p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                All Pro features
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Custom integrations
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                24/7 dedicated support
                            </li>
                            <li className="flex items-center">
                                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                API access
                            </li>
                        </ul>
                        <button className="w-full py-3 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Pricing; 