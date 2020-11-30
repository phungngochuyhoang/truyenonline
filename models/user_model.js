const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    date: {
        type: Date, 
        default: Date.now
    },
    role: Boolean
})

const User = mongoose.model('User', userSchema)

module.exports = User