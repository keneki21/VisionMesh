const express = require('express');
const router = express.Router();
const EvaluationHistory = require('../models/EvaluationHistory');
const authMiddleware = require('../middleware/auth');

// List — only the authenticated user's evaluations
router.get('/', authMiddleware, async (req, res) => {
  try {
    const items = await EvaluationHistory
      .find({ userId: req.user.id })
      .select('-imageData')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Single item — only if it belongs to the authenticated user
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await EvaluationHistory.findOne({ _id: req.params.id, userId: req.user.id });
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve image directly
router.get('/:id/image', async (req, res) => {
  try {
    console.log('[image] Fetching image for ID:', req.params.id);
    const item = await EvaluationHistory.findById(req.params.id);

    if (!item) {
      console.log('[image] Item not found');
      return res.status(404).send('Item not found');
    }

    if (!item.imageData) {
      console.log('[image] No image data for item');
      return res.status(404).send('Image data not found');
    }

    console.log('[image] Found image data, length:', item.imageData.length, 'mimeType:', item.imageMimeType);

    try {
      const buffer = Buffer.from(item.imageData, 'base64');
      console.log('[image] Decoded buffer size:', buffer.length);

      res.type(item.imageMimeType || 'image/png');
      res.set('Cache-Control', 'public, max-age=86400');
      res.send(buffer);
      console.log('[image] Sent image successfully');
    } catch (decodeErr) {
      console.error('[image] Base64 decode error:', decodeErr.message);
      res.status(500).send('Error decoding image');
    }
  } catch (err) {
    console.error('[image endpoint] error:', err.message);
    res.status(500).send('Error retrieving image: ' + err.message);
  }
});

// Kept for backward compat (no longer called by frontend)
router.post('/', async (req, res) => {
  try {
    const { filename, score, grade } = req.body;
    const item = await EvaluationHistory.create({ filename, score, grade, report: {} });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
