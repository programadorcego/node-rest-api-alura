class Payment {
    _db;

    constructor(){
        this._db = require('../config/database')();
    }

    save(payment, callback) {
        this._db.query(`INSERT INTO payments SET ?`, payment, callback)
    }

    find(id, callback) {
        this._db.query(`SELECT * FROM payments WHERE id = ?`, [id], callback);
    }

    update(payment, callback) {
        this._db.query(`UPDATE payments SET status = ? WHERE id = ?`, [payment.status, payment.id], callback);
    }

    delete(id, callback) {
        this._db.query("DELETE FROM payments WHERE id = ?", [id], callback);
    }
}

module.exports = Payment;