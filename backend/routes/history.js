const express = require('express');
const router = express.Router();
const EvaluationHistory = require('../models/EvaluationHistory');

// List — excludes heavy imageData for performance
router.get('/', async (req, res) => {
  try {
    const items = await EvaluationHistory
      .find()
      .select('-imageData')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Single item — full data including imageData
router.get('/:id', async (req, res) => {
  try {
    const item = await EvaluationHistory.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
