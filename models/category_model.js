const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
	name: String,
	note: String
})

const Category = mongoose.model('Category', categorySchema, 'Categories');

module.exports = Category