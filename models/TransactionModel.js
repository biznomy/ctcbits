var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    'task': { type: String, require: true },
    'created': { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);