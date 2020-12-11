const mongoose = require('mongoose');

const storiesSchema = new mongoose.Schema({
	name: String,
	author: String,
	categories_name: Array,
	avatar: String,
	note: String,
	statusShowHide: Boolean,
	statusFinishAndUnfinished: Boolean,
	createDay: {type: Date, default: Date.now}
})

const Stories = mongoose.model('Stories', storiesSchema, 'Stories');

module.exports = Stories