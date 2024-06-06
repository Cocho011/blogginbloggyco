const express = require('express');
const router = express.Router();
const { User, Blog, Comment } = require('../models');

// Render the homepage with all blogs
router.get('/', (req, res) => {
    Blog.findAll({ include: [User] })
        .then(blogs => {
            const hbsBlogs = blogs.map(blog => blog.get({ plain: true }));
            const loggedIn = req.session.user ? true : false;
            res.render('home', { blogs: hbsBlogs, loggedIn, username: req.session.user?.username });
        })
        .catch(err => res.status(500).json({ msg: 'An error occurred', err }));
});

// Render the login page
router.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    res.render('login');
});

// Render the signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Render the dashboard with the user's blogs and comments
router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    User.findByPk(req.session.user.id, {
        include: [Blog, Comment]
    })
        .then(userData => {
            const hbsData = userData.get({ plain: true });
            hbsData.loggedIn = req.session.user ? true : false;
            res.render('dashboard', hbsData);
        })
        .catch(err => res.status(500).json({ msg: 'An error occurred', err }));
});

// Render a specific blog page with comments
router.get('/blogs/:id', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    Blog.findByPk(req.params.id, { include: [User, { model: Comment, include: [User] }] })
        .then(dbBlog => {
            const hbsBlog = dbBlog.get({ plain: true });
            const loggedIn = req.session.user ? true : false;
            if (dbBlog.userId != req.session.user.id) {
                // If not your post -> render comment page over homepage
                return res.render('comment', { hbsBlog, loggedIn, username: req.session.user?.username });
            }
            // If your post -> render update/delete page over your dashboard
            res.render('updateDelete', { hbsBlog, loggedIn, username: req.session.user?.username });
        })
        .catch(err => res.status(500).json({ msg: 'An error occurred', err }));
});

// Redirect all other routes to the homepage
router.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = router; // Export the frontend routes
