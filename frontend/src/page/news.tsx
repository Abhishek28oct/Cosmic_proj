import React, { useState } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../App.css';

interface NewsItem {
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

const News: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

    const categories = [
        'All',
        'Space Missions',
        'Astronomy',
        'Eclipse Events',
        'Technology',
        'Research',
        'Industry'
    ];

    const newsItems: NewsItem[] = [
        // Eclipse News Items
        {
            id: 10,
            title: "Total Solar Eclipse 2024: Path of Totality Across North America",
            category: "Eclipse Events",
            date: "2024-03-16",
            image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=1000",
            summary: "On April 8, 2024, a total solar eclipse will cross North America. Find out where and when to watch this spectacular celestial event.",
            source: "NASA",
            readTime: "6 min",
            fullContent: `On April 8, 2024, a total solar eclipse will create a path of totality across North America, offering millions of people the opportunity to witness this rare celestial event. The eclipse will begin in Mexico and travel through the United States, from Texas to Maine, before continuing into Canada.

Key Details:
• Start Time: 2:07 PM EDT
• Maximum Eclipse: 3:20 PM EDT
• End Time: 4:33 PM EDT

The path of totality will be approximately 115 miles wide, and viewers within this path will experience complete darkness for up to 4 minutes and 28 seconds. This is the longest duration of totality for a solar eclipse in the United States since 1806.

Safety Precautions:
- Never look directly at the sun without proper eye protection
- Use certified solar viewing glasses
- Do not use regular sunglasses or homemade filters

Best Viewing Locations:
1. Dallas, Texas
2. Indianapolis, Indiana
3. Cleveland, Ohio
4. Buffalo, New York
5. Burlington, Vermont

Scientists and astronomers are particularly excited about this event as it provides a unique opportunity to study the sun's corona and conduct various experiments. The next total solar eclipse visible from the contiguous United States won't occur until 2044.`
        },
        {
            id: 11,
            title: "Scientists Prepare for Rare Solar Corona Study During Eclipse",
            category: "Eclipse Events",
            date: "2024-03-16",
            image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1000",
            summary: "Research teams worldwide are gearing up to study the Sun's corona during the upcoming total solar eclipse, offering a unique opportunity for solar research.",
            source: "Solar Physics Journal",
            readTime: "5 min",
            fullContent: `Scientists from around the world are preparing for a unique opportunity to study the sun's corona during the upcoming total solar eclipse. This rare event provides researchers with a natural laboratory to observe the sun's outer atmosphere in unprecedented detail.

Research Focus:
• Corona temperature and structure
• Solar wind origins
• Magnetic field dynamics
• Plasma behavior

Teams from NASA, ESA, and various universities will deploy specialized equipment along the path of totality to collect data. The eclipse's extended duration of totality will allow for more comprehensive observations than previous events.

Key Research Projects:
1. Corona Temperature Mapping
2. Solar Wind Particle Analysis
3. Magnetic Field Measurements
4. Plasma Dynamics Study

This research could lead to breakthroughs in understanding:
- Solar weather prediction
- Space weather effects on Earth
- Fundamental solar physics
- Climate change impacts

The data collected during this eclipse will be compared with observations from space-based telescopes and previous eclipse studies to build a more complete picture of our sun's behavior.`
        },
        {
            id: 12,
            title: "Eclipse Photography: Tips and Equipment Guide",
            category: "Eclipse Events",
            date: "2024-03-15",
            image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1000",
            summary: "Expert photographers share essential tips and equipment recommendations for capturing the perfect eclipse photos safely.",
            source: "Astronomy Magazine",
            readTime: "7 min"
        },
        {
            id: 13,
            title: "Eclipse Safety: Protecting Your Eyes During the Event",
            category: "Eclipse Events",
            date: "2024-03-14",
            image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1000",
            summary: "Essential safety guidelines for viewing the solar eclipse, including proper eye protection and viewing techniques.",
            source: "American Astronomical Society",
            readTime: "4 min"
        },
        // Existing News Items
        {
            id: 1,
            title: "NASA's Artemis III Mission: First Woman to Land on Moon",
            category: "Space Missions",
            date: "2024-03-15",
            image: "https://www.nasa.gov/wp-content/uploads/2023/08/artemis-iii-mission-patch.jpg",
            summary: "NASA announces details of the Artemis III mission, which will land the first woman and next man on the Moon by 2025.",
            source: "NASA",
            readTime: "5 min"
        },
        {
            id: 2,
            title: "SpaceX Starship Completes Successful Orbital Test Flight",
            category: "Space Missions",
            date: "2024-03-14",
            image: "https://www.spacex.com/static/images/starship/STARSHIP_LAUNCH.jpg",
            summary: "SpaceX's Starship successfully completes its third test flight, marking a major milestone in space exploration.",
            source: "SpaceX",
            readTime: "4 min"
        },
        {
            id: 3,
            title: "James Webb Telescope Discovers Earth-like Exoplanet",
            category: "Astronomy",
            date: "2024-03-13",
            image: "https://www.nasa.gov/wp-content/uploads/2024/01/webb.jpg",
            summary: "The James Webb Space Telescope has identified a potentially habitable exoplanet with conditions similar to Earth.",
            source: "ESA",
            readTime: "6 min"
        },
        {
            id: 4,
            title: "Revolutionary Quantum Computer for Space Applications",
            category: "Technology",
            date: "2024-03-12",
            image: "https://www.nasa.gov/wp-content/uploads/2023/quantum-computer.jpg",
            summary: "Scientists develop a new quantum computer specifically designed for space missions and satellite communications.",
            source: "MIT",
            readTime: "7 min"
        },
        {
            id: 5,
            title: "Breakthrough in Dark Matter Research",
            category: "Research",
            date: "2024-03-11",
            image: "https://www.cern.ch/dark-matter-research.jpg",
            summary: "CERN researchers make groundbreaking discovery in understanding dark matter's composition.",
            source: "CERN",
            readTime: "8 min"
        },
        {
            id: 6,
            title: "Blue Origin Announces New Space Tourism Program",
            category: "Industry",
            date: "2024-03-10",
            image: "https://www.blueorigin.com/new-shepard.jpg",
            summary: "Blue Origin reveals plans for extended space tourism flights with enhanced passenger experience.",
            source: "Blue Origin",
            readTime: "5 min"
        },
        {
            id: 7,
            title: "Mars Sample Return Mission Update",
            category: "Space Missions",
            date: "2024-03-09",
            image: "https://www.nasa.gov/mars-sample.jpg",
            summary: "NASA and ESA provide updates on the progress of the Mars Sample Return mission, set to bring Mars rocks to Earth.",
            source: "NASA/ESA",
            readTime: "6 min"
        },
        {
            id: 8,
            title: "New Space Station Solar Panels Break Efficiency Record",
            category: "Technology",
            date: "2024-03-08",
            image: "https://www.nasa.gov/iss-solar-panels.jpg",
            summary: "International Space Station's new solar panels achieve record-breaking energy efficiency in space.",
            source: "NASA",
            readTime: "4 min"
        },
        {
            id: 9,
            title: "Astronomers Detect Massive Black Hole Merger",
            category: "Astronomy",
            date: "2024-03-07",
            image: "https://www.eso.org/black-hole-merger.jpg",
            summary: "LIGO detects the largest black hole merger ever observed, providing new insights into cosmic evolution.",
            source: "LIGO",
            readTime: "7 min"
        }
    ];

    const filteredNews = newsItems.filter(item => {
        const matchesCategory = activeCategory.toLowerCase() === 'all' || item.category.toLowerCase() === activeCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.summary.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleReadMore = (article: NewsItem) => {
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
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Space News</h1>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        Stay updated with the latest developments in space exploration, astronomy, and technology
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
                            placeholder="Search news..."
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

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNews.map((news) => (
                        <div
                            key={news.id}
                            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                        >
                            <div className="relative">
                                <img
                                    src={news.image}
                                    alt={news.title}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://via.placeholder.com/400x200?text=Space+News';
                                    }}
                                />
                                <span className="absolute top-4 left-4 px-3 py-1 bg-purple-600/80 rounded-full text-sm">
                                    {news.category}
                                </span>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center text-sm text-gray-400 mb-2">
                                    <span>{news.source}</span>
                                    <span className="mx-2">•</span>
                                    <span>{news.date}</span>
                                    <span className="mx-2">•</span>
                                    <span>{news.readTime}</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 hover:text-purple-400 transition-colors">
                                    {news.title}
                                </h3>
                                <p className="text-gray-400 mb-4">
                                    {news.summary}
                                </p>
                                <button 
                                    className="text-purple-500 hover:text-purple-400 transition-colors flex items-center"
                                    onClick={() => handleReadMore(news)}
                                >
                                    Read more
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-1"
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
                    <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="relative">
                            <img
                                src={selectedArticle.image}
                                alt={selectedArticle.title}
                                className="w-full h-64 object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://via.placeholder.com/800x400?text=Space+News';
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
                            <h2 className="text-2xl font-bold mb-4">{selectedArticle.title}</h2>
                            <div className="prose prose-invert max-w-none">
                                {selectedArticle.fullContent ? (
                                    <div className="whitespace-pre-line">{selectedArticle.fullContent}</div>
                                ) : (
                                    <p>{selectedArticle.summary}</p>
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

export default News; 