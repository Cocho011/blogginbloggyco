const express = require('express');
const router = express.Router();

const userRoutes = require('./api/userRoutes');
const blogRoutes = require('./api/blogRoutes');
const commentRoutes = require('./api/commentRoutes');
const frontendRoutes = require('./frontendRoutes');

router.use('/api/users', userRoutes);
router.use('/api/blogs', blogRoutes);
router.use('/api/comments', commentRoutes);
router.use('/', frontendRoutes);

module.exports = router;
