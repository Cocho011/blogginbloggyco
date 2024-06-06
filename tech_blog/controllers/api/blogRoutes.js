const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../../models');

// Get all blogs and their associated users and comments
router.get('/', (req, res) => {
    Blog.findAll({ include: [User, Comment] })
        .then(dbBlogs => res.json(dbBlogs))
        .catch(err => res.status(500).json({ msg: 'An error occurred', err }));
});

// Get a specific blog by its ID, including the associated user and comments
router.get('/:id', (req, res) => {
    Blog.findByPk(req.params.id, { include: [User, Comment] })
        .then(dbBlog => res.json(dbBlog))
        .catch(err => res.status(500).json({ msg: 'An error occurred', err }));
});

// Create a new blog post
router.post('/', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Please login!' });
    }
    Blog.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.session.user.id
    })
        .then(newBlog => res.json(newBlog))
        .catch(err => res.status(500).json({ msg: 'An error occurred', err }));
});

// Update a blog post by its ID
router.put('/:id', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Please login!' });
    }
    Blog.update(req.body, {
        where: { id: req.params.id }
    })
        .then(updatedBlog => res.json(updatedBlog))
        .catch(err => res.status(500).json({ msg: 'An error occurred', err }));
});

// Delete a blog post by its ID
router.delete('/:id', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Please login!' });
    }
    Blog.destroy({
        where: { id: req.params.id }
    })
        .then(delBlog => res.json(delBlog))
        .catch(err => res.status(500).json({ msg: 'An error occurred', err }));
});

module.exports = router;
