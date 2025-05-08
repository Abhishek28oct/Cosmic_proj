import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const CreateBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    tags: '',
    coverImage: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please sign in to create a blog post');
        navigate('/signin');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/blogs', {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      }, {
        headers: {
          Authorization: token
        }
      });

      toast.success('Blog post created successfully!');
      navigate(`/blog/${response.data._id}`);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error creating blog post';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950/85 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="glass text-white rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800/50 text-white rounded-md ring-1 ring-gray-700 focus:ring-purple-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="summary" className="block text-sm font-medium mb-2">
                  Summary
                </label>
                <textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800/50 text-white rounded-md ring-1 ring-gray-700 focus:ring-purple-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">
                  Content
                </label>
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  className="bg-gray-800/50 text-white rounded-md"
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      ['link', 'image'],
                      ['clean']
                    ]
                  }}
                />
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800/50 text-white rounded-md ring-1 ring-gray-700 focus:ring-purple-500"
                  placeholder="space, technology, science"
                />
              </div>

              <div>
                <label htmlFor="coverImage" className="block text-sm font-medium mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  id="coverImage"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800/50 text-white rounded-md ring-1 ring-gray-700 focus:ring-purple-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-2">
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800/50 text-white rounded-md ring-1 ring-gray-700 focus:ring-purple-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Post'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}; 