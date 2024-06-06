const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require('../../util/auth');

// Get all blogs
router.get("/", (req, res) => {
    Blog.findAll({ include: [User, Comment] })
        .then(dbBlogs => res.json(dbBlogs))
        .catch(err => res.status(500).json({ msg: "an error occurred", err }));
});

// Get blog by id
router.get("/:id", (req, res) => {
    Blog.findByPk(req.params.id, { include: [User, Comment] })
        .then(dbBlog => res.json(dbBlog))
        .catch(err => res.status(500).json({ msg: "an error occurred", err }));
});

// Create new blog
router.post("/", withAuth, (req, res) => {
    Blog.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.session.user.id
    })
        .then(newBlog => res.json(newBlog))
        .catch(err => res.status(500).json({ msg: "an error occurred", err }));
});

// Update blog
router.put("/:id", withAuth, (req, res) => {
    Blog.update(req.body, {
        where: { id: req.params.id }
    })
        .then(updatedBlog => res.json(updatedBlog))
        .catch(err => res.status(500).json({ msg: "an error occurred", err }));
});

// Delete blog
router.delete("/:id", withAuth, (req, res) => {
    Blog.destroy({
        where: { id: req.params.id }
    })
        .then(delBlog => res.json(delBlog))
        .catch(err => res.status(500).json({ msg: "an error occurred", err }));
});

module.exports = router;
