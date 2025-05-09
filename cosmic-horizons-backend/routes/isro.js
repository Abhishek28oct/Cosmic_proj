import express from 'express';
import ISROUpdate from '../models/ISROUpdate.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all ISRO updates
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

    const updates = await ISROUpdate.find(query)
      .sort({ date: -1 });

    res.json(updates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ISRO updates' });
  }
});

// Get single ISRO update
router.get('/:id', async (req, res) => {
  try {
    const update = await ISROUpdate.findById(req.params.id);

    if (!update) {
      return res.status(404).json({ message: 'ISRO update not found' });
    }

    res.json(update);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ISRO update' });
  }
});

// Create ISRO update (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, content, summary, category, date, imageUrl, source, readTime, tags } = req.body;
    
    const update = new ISROUpdate({
      title,
      content,
      summary,
      category,
      date,
      imageUrl,
      source,
      readTime,
      tags
    });

    await update.save();
    res.status(201).json(update);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ISRO update' });
  }
});

// Update ISRO update (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const update = await ISROUpdate.findById(req.params.id);
    
    if (!update) {
      return res.status(404).json({ message: 'ISRO update not found' });
    }

    const { title, content, summary, category, date, imageUrl, source, readTime, tags } = req.body;
    
    if (title) update.title = title;
    if (content) update.content = content;
    if (summary) update.summary = summary;
    if (category) update.category = category;
    if (date) update.date = date;
    if (imageUrl) update.imageUrl = imageUrl;
    if (source) update.source = source;
    if (readTime) update.readTime = readTime;
    if (tags) update.tags = tags;

    await update.save();
    res.json(update);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ISRO update' });
  }
});

// Delete ISRO update (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const update = await ISROUpdate.findById(req.params.id);
    
    if (!update) {
      return res.status(404).json({ message: 'ISRO update not found' });
    }

    await update.deleteOne();
    res.json({ message: 'ISRO update deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ISRO update' });
  }
});

export default router; 