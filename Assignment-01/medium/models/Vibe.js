const mongoose = require('mongoose');

const vibeSchema = new mongoose.Schema({
  vibeText: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Vibe', vibeSchema);
