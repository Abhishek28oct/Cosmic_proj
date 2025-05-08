const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['news', 'tutorial', 'research', 'event']
  },
  tags: [{
    type: String,
    trim: true
  }],
  imageUrl: {
    type: String,
    default: ''
  },
  readTime: {
    type: Number,
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
articleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Article', articleSchema); 