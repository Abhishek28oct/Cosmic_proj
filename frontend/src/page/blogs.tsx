import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

interface BlogPost {
  _id: string;
  title: string;
  summary: string;
  author: {
    username: string;
    avatar: string;
  };
  tags: string[];
  coverImage: string;
  likes: string[];
  readTime: number;
  createdAt: string;
}

export const Blogs = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(response.data);
      } catch (error) {
        toast.error('Error fetching blog posts');
      } finally {
        setLoading(false);
      }
    };

    // Check if user is authenticated
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || blog.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags)));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950/85 to-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950/85 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
          {isAuthenticated ? (
            <Link
              to="/create-blog"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Write a Blog
            </Link>
          ) : (
            <button
              onClick={() => {
                toast.info('Please sign in to write a blog');
                navigate('/signin');
              }}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Write a Blog
            </button>
          )}
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800/50 text-white rounded-md ring-1 ring-gray-700 focus:ring-purple-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTag === tag
                  ? 'bg-purple-500 text-white'
                  : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog._id}`}
              className="glass text-white rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-200"
            >
              {blog.coverImage && (
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-gray-400 mb-4 line-clamp-2">{blog.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={blog.author.avatar || 'https://via.placeholder.com/32'}
                      alt={blog.author.username}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-sm">{blog.author.username}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{blog.readTime} min read</span>
                    <span>{blog.likes.length} likes</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No blog posts found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}; 