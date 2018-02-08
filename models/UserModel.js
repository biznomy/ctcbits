'use strict';
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	'username': { type: String, trim: true, required: true, unique: true },
	'email': { type: String, trim: true, required: true, lowercase: true, unique: true },
	'firstname': { type: String, trim: true, required: true },
	'lastname': { type: String, trim: true, required: false },
	'password': { type: String, required: true },
	'created': { type: Date, default: Date.now, required: true },
	'role': { type: String, enum: ['admin', 'user'], default: 'user' },
	'parent': { type: Schema.Types.ObjectId, ref: 'User', required: false }
});

UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);