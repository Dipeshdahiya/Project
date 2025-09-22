// backend/models/Summary.js
const mongoose = require('mongoose');

const ProductSubSchema = new mongoose.Schema({
  name: String,
  url: String,
  description: String, // raw pasted description or mock HTML
});

const SummarySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: String,
  products: [ProductSubSchema],
  summaryText: String,
  comparison: mongoose.Schema.Types.Mixed,
  criteria: mongoose.Schema.Types.Mixed
}, { timestamps: true });

module.exports = mongoose.model('Summary', SummarySchema);
