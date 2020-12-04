const md5 = require('md5');

const Users = require('../models/user_model');
const Category = require('../models/category_model');

module.exports.get_register = async function (req, res) {
		let dataCategory = await Category.find();
    res.render('register', {
			category: dataCategory
		})
}

module.exports.post_register = function (req, res) {
    let user = Users({
        username: req.body.username,
        password: md5(req.body.password),
        email: req.body.email,
        role: 0 
    })
    user.save();
}

