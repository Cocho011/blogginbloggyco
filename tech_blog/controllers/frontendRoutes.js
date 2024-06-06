const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../models');

router.get('/', (req, res) => {
    Blog.findAll({ include: [User] }).then(blogs => {
        const hbsBlogs = blogs.map(blog => blog.get({ plain: true }));
        const loggedIn = req.session.user ? true : false;
        res.render('home', { blogs: hbsBlogs, loggedIn, username: req.session.user?.username });
    });
});

router.get("/login", (req, res) => {
    if (req.session.user) {
        return res.redirect("/dashboard");
    }
    res.render("login");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.get("/dashboard", (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    User.findByPk(req.session.user.id, {
        include: [Blog, Comment]
    }).then(userData => {
        const hbsData = userData.get({ plain: true });
        hbsData.loggedIn = req.session.user ? true : false;
        res.render("dashboard", hbsData);
    });
});

router.get("/blogs/:id", (req, res) => {
    
