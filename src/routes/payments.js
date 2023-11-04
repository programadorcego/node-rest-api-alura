const payments = require('express').Router();

payments.use(require('express').json());

payments.get('/payments', (req, res) => {
    res.send('Pagamentos');
});

module.exports = payments;