
const User = require('../models/user_model');
const Category = require('../models/category_model');

module.exports.get_login = async function (req, res) {
	let dataCategory = await Category.find();
  res.render('login', {
		category: dataCategory
	})
}

module.exports.post_login = function(req, res) {
	res.redirect('/')
}

