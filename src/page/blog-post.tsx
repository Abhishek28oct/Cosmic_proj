import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Comment {
  _id: string;
  user: {
    _id: string;
    username: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
}

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  summary: string;
  author: {
    _id: string;
    username: string;
    avatar: string;
  };
  tags: string[];
  coverImage: string;
  likes: string[];
  comments: Comment[];
  readTime: number;
  createdAt: string;
}

export const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        toast.error('Error fetching blog post');
        navigate('/blogs');
      } finally {
        setLoading(false);
      }
    };

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchBlog();
  }, [id, navigate]);

  const handleLike = async () => {
    if (!user) {
      toast.error('Please sign in to like posts');
      navigate('/signin');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/blogs/${id}/like`,
        {},
        {
          headers: { Authorization: token }
        }
      );
      setBlog(response.data);
    } catch (error) {
      toast.error('Error updating like status');
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to comment');
      navigate('/signin');
      return;
    }

    if (!comment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/blogs/${id}/comments`,
        { content: comment },
        {
          headers: { Authorization: token }
        }
      );
      setBlog(response.data);
      setComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Error adding comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950/85 to-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  const isLiked = user && blog.likes.includes(user.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950/85 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass text-white rounded-lg p-8">
          {blog.coverImage && (
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
          )}

          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

          <div className="flex items-center space-x-4 mb-6">
            <img
              src={blog.author.avatar || 'https://via.placeholder.com/40'}
              alt={blog.author.username}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">{blog.author.username}</p>
              <p className="text-sm text-gray-400">
                {new Date(blog.createdAt).toLocaleDateString()} · {blog.readTime} min read
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose prose-invert max-w-none mb-8">
            <ReactQuill
              value={blog.content}
              readOnly={true}
              theme="bubble"
              modules={{ toolbar: false }}
            />
          </div>

          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                isLiked
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{blog.likes.length} Likes</span>
            </button>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <h2 className="text-2xl font-bold mb-6">Comments</h2>

            <form onSubmit={handleComment} className="mb-8">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full px-4 py-2 bg-gray-800/50 text-white rounded-md ring-1 ring-gray-700 focus:ring-purple-500 mb-4"
                rows={3}
              />
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>

            <div className="space-y-6">
              {blog.comments.map((comment) => (
                <div key={comment._id} className="flex space-x-4">
                  <img
                    src={comment.user.avatar || 'https://via.placeholder.com/40'}
                    alt={comment.user.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{comment.user.username}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-gray-300">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 