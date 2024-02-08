const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const blogRoutes = require('./routes/blogs'); // Adjust the path as necessary

// Use routes
app.use(express.json()); // for parsing application/json
app.use('/blogs', blogRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect('mongodb://localhost:27017/blogDB')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
