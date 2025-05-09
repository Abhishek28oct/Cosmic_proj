import { useState, useEffect } from 'react';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../App.css';
import BlogHero from "../components/blogComponents/bloghero";
import BlogNav from "../components/blogComponents/blognav";
import BlogCard from "../components/blogComponents/blogcard";

interface Article {
  _id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
  imageUrl: string;
  readTime: number;
  author: {
    username: string;
    profilePicture: string;
  };
  createdAt: string;
}

export const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/articles');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="bg-black py-[1px]">
        <BlogNav />
        <BlogHero />

        {/* Articles Section Starts */}
        <div
          id="articles"
          className="max-w-screen-xl mx-auto p-6 text-white font-[Montserrat] text-sm"
        >
          {/* Category and Search */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex flex-wrap space-x-4 w-[60%]">
              <button 
                onClick={() => setActiveCategory('all')}
                className={activeCategory === 'all' ? 'text-purple-500' : 'hover:text-purple-500'}
              >
                All
              </button>
              <button 
                onClick={() => setActiveCategory('news')}
                className={activeCategory === 'news' ? 'text-purple-500' : 'hover:text-purple-500'}
              >
                News
              </button>
              <button 
                onClick={() => setActiveCategory('event')}
                className={activeCategory === 'event' ? 'text-purple-500' : 'hover:text-purple-500'}
              >
                Upcoming Events
              </button>
              <button 
                onClick={() => setActiveCategory('research')}
                className={activeCategory === 'research' ? 'text-purple-500' : 'hover:text-purple-500'}
              >
                Research
              </button>
              <button 
                onClick={() => setActiveCategory('tutorial')}
                className={activeCategory === 'tutorial' ? 'text-purple-500' : 'hover:text-purple-500'}
              >
                Tutorials
              </button>
            </div>
            <div className="search-bar ml-auto">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Blog Posts */}
          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading articles...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">
              {error}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No articles found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <BlogCard
                  key={article._id}
                  title={article.title}
                  summary={article.summary}
                  imageUrl={article.imageUrl}
                  readTime={article.readTime}
                  date={new Date(article.createdAt).toLocaleDateString()}
                  author={article.author.username}
                  category={article.category}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};