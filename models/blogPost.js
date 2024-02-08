const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: String,
  timestamps: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
