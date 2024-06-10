const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth'); // Ensuring authentication middleware is used

// POST /users/register - Register a new user
router.post('/register', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7 days' });
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// POST /users/login - Login a user
router.post('/login', async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body for debugging
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Missing email or password');
            return res.status(400).send({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        console.log('user',user)
        console.log(await bcrypt.compare(password, user.password))
        if (!user || !await bcrypt.compare(password, user.password)) {
            console.log('Invalid email or password');
            return res.status(400).send({ error: 'Unable to login' });
        }

        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7 days' });
        res.send({ user, token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).send({ error: 'Authentication failed' });
    }
});

// Assuming a model that can store invalidated tokens or handle session management
const TokenBlacklist = require('../models/TokenBlacklist');

router.post('/logout', auth, async (req, res) => {
    try {
        // Optionally save the token to a blacklist
        const token = req.token;  // `req.token` should be set by your auth middleware
        await new TokenBlacklist({ token }).save();

        res.status(200).send({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Failed to logout' });
    }
});

router.get('/me', auth, async (req, res) => {
    try {
        // The user ID is stored in req.user._id from the authenticate middleware
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});
module.exports = router;
