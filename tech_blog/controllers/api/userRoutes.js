const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Sign up route - Create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        // Save user data to session
        req.session.save(() => {
            req.session.user = {
                id: newUser.id,
                username: newUser.username
            };
            res.json(newUser);
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login route - Authenticate a user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, userData.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        // Save user data to session
        req.session.save(() => {
            req.session.user = {
                id: userData.id,
                username: userData.username
            };
            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.log(err);
        res.stat
