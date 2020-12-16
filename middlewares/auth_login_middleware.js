const md5 = require('md5');

const User = require('../models/user_model');
const Category = require('../models/category_model');

module.exports.auth_login = async function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let error = [];
    let user = await User.find({username: username});
    // check valid username
    if(!username) {
        error.push('Username là bắt buộc')
    }else if(user.length === 0) {
        error.push('Username không tồn tại')
    }
    // check valid password 
    if(user.length > 0) {
        if(user[0].password !== md5(password)) {
            error.push('Password không đúng');
        }   
    }
    // result 
		let dataCategory = await Category.find();
    if(error.length > 0) {
        res.render('login', {
            err: error,
						value: req.body,
						category: dataCategory
        });
        return;
    }
    res.cookie('userid', user[0]._id, {
        signed: true
		})
    next();
}