
const User = require('../models/user_model');
const Category = require('../models/category_model');

module.exports.auth_register = async function(req, res, next) {
    let error = [];
    let user = await User.find({username: req.body.username})
    // check valid username
    if(!req.body.username) {
        error.push('Username là bắt buộc')
    }else if(user.length !== 0) {
        if(user[0].username === req.body.username) error.push('Username đã tồn tại')
    }
    // check vaild email
    if(!req.body.email) {
        error.push('Email là bắt buộc')
    }else if(!req.body.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        error.push('Email không hợp lệ')
    }
    // check valid password
    if(!req.body.password) {
        error.push('Password là bắt buộc')
    }else if(req.body.password.length < 6) {
        error.push('password ít nhất 6 kí tự')
    }else if(!req.body.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm)) {
        error.push('Password phải có ít nhất một kí tự đặc biệt, chữ hoa, chữ thường và số')
    }
    // check valid retype password
    if(req.body.password !== req.body['password-retype']) {
        error.push('Password không hợp lệ')
    }
    // result 
		let dataCategory = await Category.find();
    if(error.length > 0) {
        res.render('register', {
            err: error,
						value: req.body,
						category: dataCategory        
        })
        return;
    }else {
			res.redirect('/login')
    }
    next();
}

