// backend/routes/barChart.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
  const { month } = req.query;
  const transactions = await Transaction.find({ dateOfSale: { $regex: `-${month}-`, $options: 'i' } });

  const priceRanges = transactions.reduce((ranges, transaction) => {
    const price = transaction.price;
    if (price < 50) ranges['0-49'] = (ranges['0-49'] || 0) + 1;
    else if (price < 100) ranges['50-99'] = (ranges['50-99'] || 0) + 1;
    else if (price < 150) ranges['100-149'] = (ranges['100-149'] || 0) + 1;
    else if (price < 200) ranges['150-199'] = (ranges['150-199'] || 0) + 1;
    else ranges['200+'] = (ranges['200+'] || 0) + 1;
    return ranges;
  }, {});

  res.json(priceRanges);
});

module.exports = router;
