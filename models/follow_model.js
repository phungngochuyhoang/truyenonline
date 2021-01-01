const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
	userId: String,
	storyId: String,
	status: Boolean,
	date: { type: Date, default: Date.now }
})

const Follow = mongoose.model('Follows', followSchema, 'Follows');

module.exports = Follow

