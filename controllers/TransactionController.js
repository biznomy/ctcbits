var TransactionModel = require('../models/TransactionModel.js');

/**
 * TransactionController.js
 *
 * @description :: Server-side logic for managing Transactions.
 */
module.exports = {

    /**
     * TransactionController.list()
     */
    list: function (req, res) {
        TransactionModel.find(req.query, function (err, Transactions) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }
            return res.json(Transactions);
        });
    },

    /**
     * TransactionController.show()
     */
    show: function (req, res) {
        TransactionModel.findById(req.params.id, function (err, Transaction) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }
            return res.json(Transaction);
        });
    },

    /**
     * TransactionController.create()
     */
    create: function (req, res) {

        var Transaction = new TransactionModel(req.body);

        Transaction.save(function (err, Transaction) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }
            return res.status(201).json(Transaction);
        });
    },

    /**
     * TransactionController.update()
     */
    update: function (req, res) {
        TransactionModel.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, Transaction) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }     

            return res.json(Transaction);
        });
    },

    /**
     * TransactionController.remove()
     */
    remove: function (req, res) {
        TransactionModel.findByIdAndRemove(req.params.id, function (err, Transaction) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
