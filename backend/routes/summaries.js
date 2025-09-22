// backend/routes/summaries.js
const express = require('express');
const auth = require('../middleware/auth');
const Summary = require('../models/Summary');
const { summarizeProducts } = require('../utils/aiClient');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const summaries = await Summary.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(summaries);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title = 'Untitled', products = [], criteria = {} } = req.body;
    // Basic sanitization/validation (expand as needed)
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ msg: 'Provide at least one product' });
    }

    const summaryText = await summarizeProducts(products, criteria);

    const doc = await Summary.create({
      user: req.user.id,
      title,
      products,
      summaryText,
      criteria
    });

    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error creating summary', error: err.message });
  }
});

module.exports = router;
