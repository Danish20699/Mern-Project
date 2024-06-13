// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/client', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/statistics', require('./routes/statistics'));
app.use('/api/bar-chart', require('./routes/barChart'));
app.use('/api/pie-chart', require('./routes/pieChart'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
