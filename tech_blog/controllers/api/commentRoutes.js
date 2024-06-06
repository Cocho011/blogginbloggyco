const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../../models');

// Get all comments and their associated users and blogs
router.get('/', (req, res) => {
    Comment.findAll({ include: [User, Blog] })
        .then(dbComments => res.json(dbComments))
        .catch(err => res.status(500).json({ msg: 'An error occurred', err }));
});

// Get a specific comment by its ID, including the associated user and blog
router.get('/:id', (req, res) => {
    Comment.findByPk(req.params.id, { include: [User, Blog] })
        .then(dbComment => res.json(dbComment))
        .catch(err => res.status(500).json({ msg: 'An error occurred', err }));
});

// Create a new comment
router.post('/', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Please login first!' });
    }
    Comment.create({
        body: req.body.body,
        userId: req.session.user.id,
        blogId: req.body.blogId
    })
        .then(newComment => res.json(newComment))
        .catch(err => res.status(500).json({ msg: 'An error occurred', err }));
});

// Update a comment by its ID
router.put('/:id', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Please login first!' });
    }
    Comment.update(req.body, {
        where: { id: req.params.id }
    })
        .then(updatedComment => res.json(updatedComment))
        .catch(err => res.status(500).json({ msg: 'An error occurred', err }));
});

// Delete a comment by its ID
router.delete('/:id', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ msg: 'Please login first!' });
    }
    Comment.destroy({
        where: { id: req.params.id }
    })
        .then(delComment => res.json(delComment))
        .catch(err => res.status(500).json({ msg: 'An error occurred', err }));
});

module.exports = router; // Export the comment routes
