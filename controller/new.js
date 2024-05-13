const express = require('express');
const news = express.Router();
require('dotenv').config();
const Preferences = require('@models/preference');
const { verifyToken } = require('@middleware/jwtUtil');
const axios = require('axios');

const url = `http://api.mediastack.com/v1/news?access_key=${process.env.BING_KEY}&country=in&sources=`
news.get('/', verifyToken, async (req, res) => {
    try {
        const preferences = await Preferences.findOne({ user: req.user.id });
        if (!preferences) {
           return res.status(400).json({message: "Please add Preferences to fetech news"})
        }
        const userPreference = preferences.preferences.join(',');
        let userPreferenceUrl = `${url}${userPreference}`
        axios.get(userPreferenceUrl).then(response => {
            res.status(200).json(response.data)
        }).catch(err => {
            res.status(400).json({message: err.message});
        })
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = news;