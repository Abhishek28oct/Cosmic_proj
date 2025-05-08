import React, { useState, useEffect } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../App.css';

interface ISROUpdate {
    id: number;
    title: string;
    category: string;
    date: string;
    image: string;
    summary: string;
    source: string;
    readTime: string;
    fullContent?: string;
}

interface LaunchData {
    name: string;
    date: string;
    status: string;
    description: string;
}

const ISRO: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArticle, setSelectedArticle] = useState<ISROUpdate | null>(null);
    const [launchData, setLaunchData] = useState<LaunchData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const categories = [
        'All',
        'Missions',
        'Technology',
        'Research',
        'Achievements',
        'Future Plans'
    ];

    // Fetch launch data from ISRO API
    useEffect(() => {
        const fetchLaunchData = async () => {
            try {
                const response = await fetch('https://isro.vercel.app/api/launches');
                if (!response.ok) {
                    throw new Error('Failed to fetch launch data');
                }
                const data = await response.json();
                setLaunchData(data.launches || []);
            } catch (err) {
                console.error('Error fetching launch data:', err);
                // Set some default launch data if API fails
                setLaunchData([
                    {
                        name: "Gaganyaan G1",
                        date: "2024",
                        status: "Upcoming",
                        description: "First uncrewed test flight of Gaganyaan mission"
                    },
                    {
                        name: "Chandrayaan-4",
                        date: "2025",
                        status: "Planned",
                        description: "Next generation lunar mission with enhanced capabilities"
                    },
                    {
                        name: "Aditya-L2",
                        date: "2025",
                        status: "Planned",
                        description: "Follow-up mission to study the Sun"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchLaunchData();
    }, []);

    const isroUpdates: ISROUpdate[] = [
        {
            id: 1,
            title: "Gaganyaan Mission: India's First Human Spaceflight",
            category: "Missions",
            date: "2024-03-16",
            image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1000",
            summary: "ISRO's ambitious Gaganyaan mission is set to make India the fourth country to send humans to space. Get the latest updates on this historic mission.",
            source: "ISRO",
            readTime: "6 min",
            fullContent: `ISRO's Gaganyaan mission represents a significant milestone in India's space exploration journey. This ambitious project aims to send Indian astronauts to space, making India the fourth country to achieve this feat.

Mission Timeline:
• 2024: Uncrewed test flights
• 2025: First crewed mission
• 2026: Second crewed mission

Key Components:
1. Crew Module
2. Service Module
3. Launch Vehicle (GSLV Mk III)
4. Crew Escape System

Training and Preparation:
- Astronauts undergoing rigorous training in Russia
- Development of life support systems
- Testing of crew module and escape systems
- Simulation of various mission scenarios

Significance:
• Technological advancement
• International collaboration
• Scientific research opportunities
• Inspiration for future generations

The mission will demonstrate India's capability to undertake human spaceflight missions and pave the way for future space exploration endeavors.`
        },
        {
            id: 2,
            title: "Chandrayaan-3: India's Historic Moon Landing",
            category: "Achievements",
            date: "2023-08-23",
            image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1000",
            summary: "ISRO successfully landed Chandrayaan-3 on the Moon's south pole, making India the first country to achieve this feat.",
            source: "ISRO",
            readTime: "5 min",
            fullContent: `Chandrayaan-3's successful landing on the Moon's south pole marked a historic achievement for India's space program.

Key Achievements:
• First successful soft landing on Moon's south pole
• Successful deployment of Pragyan rover
• Collection of valuable scientific data
• Demonstration of advanced landing technology

Scientific Objectives:
1. Study of lunar surface composition
2. Analysis of lunar atmosphere
3. Investigation of water ice presence
4. Mapping of lunar resources

Mission Components:
- Vikram Lander
- Pragyan Rover
- Propulsion Module

Significance:
• Global recognition of India's space capabilities
• Advancement in lunar exploration
• Contribution to international space research
• Inspiration for future missions`
        },
        {
            id: 3,
            title: "Aditya-L1: India's First Solar Mission",
            category: "Missions",
            date: "2023-09-02",
            image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1000",
            summary: "ISRO's first dedicated solar mission, Aditya-L1, successfully launched to study the Sun from Lagrange point 1.",
            source: "ISRO",
            readTime: "4 min",
            fullContent: `Aditya-L1 is India's first space-based observatory to study the Sun from a halo orbit around the L1 point.

Mission Objectives:
• Study of solar corona
• Analysis of solar wind
• Investigation of space weather
• Understanding of solar-terrestrial relations

Scientific Payloads:
1. Visible Emission Line Coronagraph
2. Solar Ultraviolet Imaging Telescope
3. Aditya Solar Wind Particle Experiment
4. Plasma Analyser Package

Significance:
• First Indian mission to study the Sun
• Contribution to space weather prediction
• Understanding of solar-terrestrial physics
• International collaboration opportunities`
        },
        {
            id: 4,
            title: "ISRO's Reusable Launch Vehicle Program",
            category: "Technology",
            date: "2024-03-15",
            image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1000",
            summary: "ISRO's RLV program aims to develop reusable launch vehicles to reduce space mission costs.",
            source: "ISRO",
            readTime: "5 min",
            fullContent: `The Reusable Launch Vehicle (RLV) program is a significant step toward making space access more affordable.

Key Features:
• Autonomous landing capability
• Advanced thermal protection
• Precision navigation systems
• Cost-effective operations

Development Phases:
1. Technology demonstration
2. Suborbital flights
3. Orbital missions
4. Operational deployment

Benefits:
- Reduced launch costs
- Increased launch frequency
- Enhanced payload capacity
- Sustainable space operations

Future Plans:
• Development of fully reusable stages
• Integration with GSLV program
• Commercial launch capabilities
• International collaboration opportunities`
        },
        {
            id: 5,
            title: "ISRO's Space Station Plans",
            category: "Future Plans",
            date: "2024-03-14",
            image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1000",
            summary: "ISRO announces plans for India's first space station, marking a new era in Indian space exploration.",
            source: "ISRO",
            readTime: "6 min",
            fullContent: `ISRO has announced plans to establish India's first space station, marking a significant step in the country's space exploration capabilities.

Project Details:
• Launch Timeline: 2030
• Initial Module Weight: 20 tons
• Crew Capacity: 3 astronauts
• Mission Duration: 15-20 days

Key Features:
1. Modular design
2. Advanced life support systems
3. Research facilities
4. Docking capabilities

Research Areas:
- Microgravity experiments
- Material science
- Biology and medicine
- Earth observation

The space station will serve as a platform for:
• Scientific research
• Technology demonstration
• International collaboration
• Human spaceflight experience`
        },
        {
            id: 6,
            title: "ISRO's Mars Orbiter Mission Success",
            category: "Achievements",
            date: "2014-09-24",
            image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1000",
            summary: "India's first interplanetary mission, Mangalyaan, successfully entered Mars orbit on its first attempt.",
            source: "ISRO",
            readTime: "5 min",
            fullContent: `The Mars Orbiter Mission (MOM), also known as Mangalyaan, was India's first interplanetary mission and a remarkable success.

Key Achievements:
• First successful Mars mission on first attempt
• Cost-effective mission execution
• Successful orbital insertion
• Extended mission life

Scientific Objectives:
1. Study of Martian atmosphere
2. Analysis of surface features
3. Investigation of mineralogy
4. Search for methane

Mission Significance:
• Global recognition
• Cost-effective space exploration
• Technological advancement
• Inspiration for future missions

Legacy:
- Paved way for future interplanetary missions
- Demonstrated India's space capabilities
- Enhanced international collaboration
- Inspired future generations`
        }
    ];

    const filteredUpdates = isroUpdates.filter(item => {
        const matchesCategory = activeCategory.toLowerCase() === 'all' || item.category.toLowerCase() === activeCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.summary.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleReadMore = (article: ISROUpdate) => {
        setSelectedArticle(article);
    };

    const handleCloseModal = () => {
        setSelectedArticle(null);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            
            {/* Hero Section */}
            <div className="relative h-[40vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black z-10"></div>
                <div className="relative z-20 text-center px-4">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">ISRO Updates</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Stay updated with India's space exploration journey, from missions to technological breakthroughs
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Search and Filter Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    {/* Search Bar */}
                    <div className="w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Search ISRO updates..."
                            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`px-4 py-2 rounded-full text-sm transition-all ${
                                    activeCategory.toLowerCase() === category.toLowerCase()
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                }`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Launch Schedule Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Upcoming Launches</h2>
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                            <p className="mt-4 text-gray-400">Loading launch data...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {launchData.map((launch, index) => (
                                <div key={index} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-purple-500/20">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-purple-400">{launch.name}</h3>
                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                            launch.status === 'Upcoming' ? 'bg-green-500/20 text-green-400' :
                                            launch.status === 'Planned' ? 'bg-blue-500/20 text-blue-400' :
                                            'bg-gray-500/20 text-gray-400'
                                        }`}>
                                            {launch.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 mb-2">Launch Date: {launch.date}</p>
                                    <p className="text-gray-300">{launch.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Updates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUpdates.map((update) => (
                        <div
                            key={update.id}
                            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-gray-700 hover:border-purple-500/50"
                        >
                            <div className="relative">
                                <img
                                    src={update.image}
                                    alt={update.title}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://via.placeholder.com/400x200?text=ISRO+News';
                                    }}
                                />
                                <span className="absolute top-4 left-4 px-3 py-1 bg-purple-600/80 rounded-full text-sm">
                                    {update.category}
                                </span>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center text-sm text-gray-400 mb-2">
                                    <span>{update.source}</span>
                                    <span className="mx-2">•</span>
                                    <span>{update.date}</span>
                                    <span className="mx-2">•</span>
                                    <span>{update.readTime}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-purple-400 hover:text-purple-300 transition-colors">
                                    {update.title}
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    {update.summary}
                                </p>
                                <button 
                                    className="text-purple-500 hover:text-purple-400 transition-colors flex items-center group"
                                    onClick={() => handleReadMore(update)}
                                >
                                    Read more
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Article Modal */}
            {selectedArticle && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
                        <div className="relative">
                            <img
                                src={selectedArticle.image}
                                alt={selectedArticle.title}
                                className="w-full h-64 object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://via.placeholder.com/800x400?text=ISRO+News';
                                }}
                            />
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center text-sm text-gray-400 mb-2">
                                <span>{selectedArticle.source}</span>
                                <span className="mx-2">•</span>
                                <span>{selectedArticle.date}</span>
                                <span className="mx-2">•</span>
                                <span>{selectedArticle.readTime}</span>
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-purple-400">{selectedArticle.title}</h2>
                            <div className="prose prose-invert max-w-none">
                                {selectedArticle.fullContent ? (
                                    <div className="whitespace-pre-line text-gray-300">{selectedArticle.fullContent}</div>
                                ) : (
                                    <p className="text-gray-300">{selectedArticle.summary}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ISRO; 