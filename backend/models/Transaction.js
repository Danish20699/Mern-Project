// backend/routes/transactions.js
const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

router.get('/', async (req, res) => {
  const { month, search, page = 1 } = req.query;
  const limit = 10;
  const skip = (page - 1) * limit;
  const query = {
    dateOfSale: { $regex: `-${month}-`, $options: 'i' },
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ]
  };
  const transactions = await Transaction.find(query).limit(limit).skip(skip);
  res.json(transactions);
});

module.exports = router;
