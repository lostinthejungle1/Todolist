// src/models/TokenBlacklist.js
const mongoose = require('mongoose');

const tokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        expires: '1h'  // Token data will expire and be removed after 1 hour
    }
});

module.exports = mongoose.model('TokenBlacklist', tokenBlacklistSchema);
