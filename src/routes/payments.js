const payments = require('express').Router();

payments.use(require('express').json());

payments.get('/payments', (req, res) => {
    res.send('Pagamentos');
});

payments.post('/payments/payment', (req, res) => {
    let payment = req.body;
    payment.status = 'created';
    payment.date = new Date();
    res.send(payment);
});

module.exports = payments;