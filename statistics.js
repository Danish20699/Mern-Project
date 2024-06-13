// backend/routes/statistics.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
  const { month } = req.query;
  const transactions = await Transaction.find({ dateOfSale: { $regex: `-${month}-`, $options: 'i' } });

  const totalSaleAmount = transactions.reduce((sum, transaction) => sum + transaction.price, 0);
  const totalSoldItems = transactions.filter(transaction => transaction.price > 0).length;
  const totalNotSoldItems = transactions.filter(transaction => transaction.price === 0).length;

  res.json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
});

module.exports = router;
