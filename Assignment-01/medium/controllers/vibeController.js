const Vibe = require('../models/Vibe');

exports.getAllVibes = async (req, res) => {
  try {
    const vibes = await Vibe.find().populate('user', 'username');
    res.status(200).json(vibes);
  } catch {
    res.status(500).json({ error: 'Could not fetch vibes' });
  }
};

exports.createVibe = async (req, res) => {
  const { vibeText } = req.body;

  if (!vibeText) {
    return res.status(400).json({ error: 'Vibe text is required' });
  }

  try {
    const newVibe = await Vibe.create({
      vibeText,
      user: req.user.id,
    });
    res.status(201).json(newVibe);
  } catch {
    res.status(500).json({ error: 'Failed to post vibe' });
  }
};
