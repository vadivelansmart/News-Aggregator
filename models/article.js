const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    author: [String],
    title: [String],
    description: [String],
    url: [String],
    source: [String],
    image: [String],
    category: [String],
    language: [String],
    country: [String],
    published_at: [Date],
    read: { type: [Boolean], default: false },
    favorite: { type: [Boolean], default: false }
});

module.exports = mongoose.model('Article', articleSchema);