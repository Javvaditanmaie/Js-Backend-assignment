// models/Vibe.js
const mongoose = require('mongoose');

const vibeSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'neutral'],
    default: 'neutral'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // links to User model
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Vibe', vibeSchema);
