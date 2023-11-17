const payments = require('express').Router();
const { json } = require('express');
const { check, validationResult } = require('express-validator');

const PaymentModel = require('../models/Payment');
const Payment = new PaymentModel();

payments.use(json());

payments.get('/payments', (req, res) => {
    res.send('Pagamentos');
});

payments.post('/payments/payment', [
    check('payment').notEmpty().withMessage('payment is required'),
    check('price').notEmpty().isFloat().withMessage('price is required and must be decimal')
], (req, res) => {
    console.log('Processing new payment request');

    const payment = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        console.log('Validation Errors');
        return res.status(400).json({errors: errors.array()});
    }
    payment.status = 'created';
    payment.date = new Date();
    
    Payment.save(payment, (err, result) => {
        if(err) {
            res.status(500);
            console.log(`Error inserting into database: ${err}`);
            return res.json(err);
        }

        console.log('Payment Created');
        res.status(201).location(`/api/payments/payment/${result.insertId}`).json(payment);
    });
});

payments.put('/payments/payment/:id', (req, res) => {
    const id = req.params.id;
    const payment = {
        id: id,
        status: 'confirmed'
    };

    Payment.update(payment, (err, result) => {
        if(err) {
            return res.status(500).json({error: err});
        }

        console.log('Payment Created');

        res.json(payment);
    });
});

payments.delete("/payments/payment/:id", (req, res) => {
    const id = req.params.id;

    Payment.delete(id, (err, result) => {
        if(err) return res.status(500).json({error: err});

        console.log("Payment Removed!");

        return res.status(204).json({status: "success", message: "Payment Removed"});
    });
});

module.exports = payments;