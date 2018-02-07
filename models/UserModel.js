'use strict';
var mongoose = require('mongoose');
var	bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	'username': { type: String, trim: true, required: true , unique: true },
	'email': { type: String, trim: true, required: true, lowercase: true},
	'password': { type: String, required: true },
	'created': { type: Date, default: Date.now },
	'role': { type: String, enum: ['admin', 'user'], default: 'user' }
});

UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);