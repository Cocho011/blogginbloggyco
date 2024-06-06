const express = require('express');
const router = express.Router();

const userRoutes = require('./api/userRoutes');
const blogRoutes = require('./api/blogRoutes');
const commentRoutes = require('./api/commentRoutes');
const frontendRoutes = require('./frontendRoutes');

// Use API routes for users, blogs, and comments
router.use('/api/users', userRoutes);
router.use('/api/blogs', blogRoutes);
router.use('/api/comments', commentRoutes);

// Use frontend routes for rendering pages
router.use('/', frontendRoutes);

module.exports = router; // Export all routes
