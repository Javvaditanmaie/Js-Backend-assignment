// routes/vibes.js
const express = require('express');
const router = express.Router();
const Vibe = require('../models/Vibe');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const { content, mood } = req.body;

  if (!content || !mood) {
    return res.status(400).json({ error: 'Content and mood are required' });
  }

  try {
    const vibe = await Vibe.create({
      content,
      mood,
      user: req.user.id // extracted from JWT in middleware
    });

    res.status(201).json(vibe);
  } catch (err) {
    console.error('Error creating vibe:', err);
    res.status(500).json({ error: 'Could not create vibe' });
  }
});
router.get('/', async (req, res) => {
  try {
    const vibes = await Vibe.find()
      .populate('user', '_id username') // 👈 Populate user field with _id and username only
      .sort({ createdAt: -1 });

    res.status(200).json(vibes);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch vibes' });
  }
});
module.exports = router;
