const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { auth } = require('../middleware/auth');

// Create a new blog post
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, summary, tags, coverImage, status } = req.body;
    
    // Calculate read time (assuming average reading speed of 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    const blog = new Blog({
      title,
      content,
      summary,
      tags,
      coverImage,
      status,
      author: req.user._id,
      readTime
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog post' });
  }
});

// Get all published blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' })
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog posts' });
  }
});

// Get a single blog post
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'username avatar')
      .populate('comments.user', 'username avatar');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog post' });
  }
});

// Update a blog post
router.put('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    // Check if user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this blog post' });
    }
    
    const { title, content, summary, tags, coverImage, status } = req.body;
    
    // Calculate new read time
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.summary = summary || blog.summary;
    blog.tags = tags || blog.tags;
    blog.coverImage = coverImage || blog.coverImage;
    blog.status = status || blog.status;
    blog.readTime = readTime;
    
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating blog post' });
  }
});

// Delete a blog post
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    // Check if user is the author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this blog post' });
    }
    
    await blog.remove();
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog post' });
  }
});

// Add a comment to a blog post
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    const { content } = req.body;
    
    blog.comments.push({
      user: req.user._id,
      content
    });
    
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment' });
  }
});

// Like/Unlike a blog post
router.post('/:id/like', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    const likeIndex = blog.likes.indexOf(req.user._id);
    
    if (likeIndex === -1) {
      // Like the post
      blog.likes.push(req.user._id);
    } else {
      // Unlike the post
      blog.likes.splice(likeIndex, 1);
    }
    
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating like status' });
  }
});

module.exports = router; 