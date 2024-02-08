const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogPost');

// POST /blogs: Create a new blog post
router.post('/', async (req, res) => {
  const { title, body, author } = req.body;
  
  if (!title || !body) {
    return res.status(400).send('Title and body are required.');
  }

  try {
    const newPost = new BlogPost({ title, body, author });
    await newPost.save();
    res.status(201).send(newPost);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET /blogs: Retrieve all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).send(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET /blogs/:id: Retrieve a single blog post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found.');
    }
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PUT /blogs/:id: Update a blog post by ID
router.put('/:id', async (req, res) => {
  const { title, body, author } = req.body;

  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, { title, body, author }, { new: true, runValidators: true });
    if (!post) {
      return res.status(404).send('Post not found.');
    }
    res.status(200).send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE /blogs/:id: Delete a blog post by ID
router.delete('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send('Post not found.');
    }
    res.status(204).send(); // No content to send back
  } catch (err) {
    res.status(500).send(err.message); // Internal Server Error
  }
});

module.exports = router;
