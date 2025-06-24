const express = require('express');
const router = express.Router();
const { getAllVibes, createVibe } = require('../controllers/vibeController');
const protect = require('../middleware/auth');

router.get('/', getAllVibes);
router.post('/', protect, createVibe);

module.exports = router;
