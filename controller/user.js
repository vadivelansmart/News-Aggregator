const express = require('express');
const user = express.Router();
const bcrypt = require('bcrypt');
const User = require('@models/user');
const Preferences = require('@models/preference');
const { signToken, verifyToken } = require('@middleware/jwtUtil');

user.post('/register', async (req, res) => {
    try {
        const user = new User({
            fullName: req.body.fullName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            role: req.body.role
        });
        const savedUser = await user.save();
        if (savedUser) {
            return res.status(200).json({ message: "User registered successfully" });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

user.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: "user not found" });
        }
        const isPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!isPassword) {
            return res.status(401).json({ message: "Invalid Password" });
        }
        const token = signToken(user);
        if (!token) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        res.status(200).json({
            user: {
                id: user.id
            },
            message: "Login successful",
            accessToken: token
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

user.get('/preferences', verifyToken, async (req, res) => {
    try {
        const preferences = await Preferences.findOne({ user: req.user.id });   
        return res.status(200).json(preferences);
    } catch (err) { return res.status(500).json({ error: "Internal Server Error" }); }
})
user.post('/preferences', verifyToken, async (req, res) => {
    const { preferences } = req.body
    try {
        const preference = new Preferences({
            user: req.user.id,
            preferences: preferences
        });
        const savedPreference = await preference.save();
        if (savedPreference) {
            return res.status(200).json({ message: "Preferences updated successfully" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

user.put('/preferences', verifyToken, async (req, res) => {
    const  preferencesData = req.body.preferences
    try {
        let preferences = await Preferences.findOne({ user: req.user.id });
        if (!preferences) {
            preferences = new Preferences({
                user: req.user.id,
                preferences: preferencesData
            });
        } else {
            preferences.preferences = preferencesData;
        }
        await preferences.save();
        res.status(200).json({ message: 'Preferences updated successfully' });

    } catch (error) {
        res.status(500).json({ message:error.message});
    }
})


module.exports = user;