const payments = require('express').Router();

const PaymentModel = require('../models/Payment');
const Payment = new PaymentModel();

payments.use(require('express').json());

payments.get('/payments', (req, res) => {
    res.send('Pagamentos');
});

payments.post('/payments/payment', (req, res) => {
    let payment = req.body;
    payment.status = 'created';
    payment.date = new Date();
    
    Payment.save(payment, (err, result) => {
        if(err) return console.log(err.message);
        console.log('Pagamento Criado');
        console.log(result);
        res.json(payment);
    });
});

module.exports = payments;