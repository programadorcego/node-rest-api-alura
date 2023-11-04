const payments = require('express').Router();

payments.use(require('express').json());

payments.get('/payments', (req, res) => {
    res.send('Pagamentos');
});

payments.post('/payments/payment', (req, res) => {
    let payment = req.body;
    console.log(JSON.stringify(payment));
    res.send('ok');
});

module.exports = payments;