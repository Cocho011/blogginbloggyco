const express = require("express");
const router = express.Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require('../../util/auth');

router.get("/", (req, res) => {
    Blog.findAll({ include: [User, Comment] })
        .then(dbBlogs => res.json(dbBlogs))
        .catch(err => res.status(500).json({ msg: "an error occured", err }));
});

router.get("/:id", (req, res) => {
    Blog.findByPk(req.params.id, { include: [User, Comment] })
        .then(dbBlog => res.json(dbBlog))
        .catch(err => res.status(500).json({ msg: "an error occured", err }));
});

router.post("/", withAuth, (req, res) => {
    Blog.create({
        title: req.body.title,
        content: req.body.content,
        userId: req.session.user.id
    })
        .then(newBlog => res.json(newBlog))
        .catch(err => res.status(500).json({ msg: "an error occured", err }));
});

router.put("/:id", withAuth, (req, res) => {
    Blog.update(req.body, {
        where: { id: req.params.id }
    }).then(updatedBlog => res.json(updatedBlog))
        .catch(err => res.status(500).json({ msg: "an error occured", err }));
});

router.delete("/:id", withAuth, (req, res) => {
    Blog.destroy({
        where: { id: req.params.id }
    }).then(delBlog => res.json(delBlog))
        .catch(err => res.status(500).json({ msg: "an error occured", err }));
});

module.exports = router;
