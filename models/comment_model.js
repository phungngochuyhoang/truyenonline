const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	User_id: String,
	Story_id: String,
	content: String,
	parent_id: String
})

const Comment = mongoose.model('Comments', commentSchema, 'Comments');

module.exports = Comment