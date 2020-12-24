const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
		email: String,
		avatar: String,
		role: Number,
    date: {type: Date, default: Date.now},
})

const User = mongoose.model('User', userSchema, 'Users')

module.exports = User