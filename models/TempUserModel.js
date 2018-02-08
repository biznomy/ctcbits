var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TempUserSchema = new Schema({
	'email' : { type: String, trim: true, required: true},
	'otp' : { type: String, trim: true, required: true},
	'expiration' : { type: Date, default: Date.now, required: true}
});

TempUserSchema.methods.addExpiration = function () {
	return new Date(Date.now() + (10 * 60 * 1000));
};

module.exports = mongoose.model('TempUser', TempUserSchema);
