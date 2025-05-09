import express from 'express';
import Article from '../models/Article.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all articles
router.get('/', async (req, res) => {
  try {
    const { category, tag, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (tag) query.tags = tag;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const articles = await Article.find(query)
      .populate('author', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching articles' });
  }
});

// Get single article
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate('author', 'username profilePicture')
      .populate('comments.user', 'username profilePicture');

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching article' });
  }
});

// Create article
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, summary, category, tags, imageUrl, readTime } = req.body;
    
    const article = new Article({
      title,
      content,
      summary,
      author: req.user._id,
      category,
      tags,
      imageUrl,
      readTime
    });

    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error creating article' });
  }
});

// Update article
router.put('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Check if user is author or admin
    if (article.author.toString() !== req.user._id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { title, content, summary, category, tags, imageUrl, readTime } = req.body;
    
    if (title) article.title = title;
    if (content) article.content = content;
    if (summary) article.summary = summary;
    if (category) article.category = category;
    if (tags) article.tags = tags;
    if (imageUrl) article.imageUrl = imageUrl;
    if (readTime) article.readTime = readTime;

    await article.save();
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error updating article' });
  }
});

// Delete article
router.delete('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Check if user is author or admin
    if (article.author.toString() !== req.user._id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await article.deleteOne();
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting article' });
  }
});

// Add comment
router.post('/:id/comments', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    article.comments.push({
      user: req.user._id,
      content: req.body.content
    });

    await article.save();
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment' });
  }
});

// Like article
router.post('/:id/like', auth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    article.likes += 1;
    await article.save();
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error liking article' });
  }
});

export default router; 