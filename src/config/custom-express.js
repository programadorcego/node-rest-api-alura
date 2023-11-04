const express = require('express');
const payments = require('../routes/payments');

const app = express();
app.use('/api', payments);

module.exports = app;