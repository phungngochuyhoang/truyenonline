const mongoose = require('mongoose');
const { create } = require('./stories_model');

const chapterSchema = mongoose.Schema({
	id_story: String,
	name: String,
	content: String,
	createDay: {type: Date, default: Date.now}
})

const Chapters = mongoose.model('Chapters', chapterSchema, 'Chapters')

module.exports = Chapters
