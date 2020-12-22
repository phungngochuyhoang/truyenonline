const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
		email: String,
		avatar: String,
    date: {
        type: Date, 
        default: Date.now
    },
    role: Number
})

const User = mongoose.model('User', userSchema, 'Users')

module.exports = User