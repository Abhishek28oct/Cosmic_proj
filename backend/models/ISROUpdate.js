const mongoose = require('mongoose');

const isroUpdateSchema = new mongoose.Schema({
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
  category: {
    type: String,
    required: true,
    enum: ['mission', 'launch', 'research', 'achievement', 'news']
  },
  date: {
    type: Date,
    required: true
  },
  imageUrl: {
    type: String,
    default: ''
  },
  source: {
    type: String,
    required: true
  },
  readTime: {
    type: Number,
    required: true
  },
  tags: [{
    type: String,
    trim: true
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
isroUpdateSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ISROUpdate', isroUpdateSchema); 