var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    'task': { type: String, require: true },
    'created': { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', TodoSchema);