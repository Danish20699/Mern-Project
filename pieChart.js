// backend/routes/pieChart.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
  const { month } = req.query;
  const transactions = await Transaction.find({ dateOfSale: { $regex: `-${month}-`, $options: 'i' } });

  const categories = transactions.reduce((counts, transaction) => {
    const category = transaction.category || 'Unknown';
    counts[category] = (counts[category] || 0) + 1;
    return counts;
  }, {});

  res.json(categories);
});

module.exports = router;
