const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

// Sign up route
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

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

// Login route
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

        req.session.save(() => {
            req.session.user = {
                id: userData.id,
                username: userData.username
            };
            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout route
router.post('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
