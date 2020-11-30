
const Users = require('../models/user_model');

module.exports.get_register = function (req, res) {
    res.render('register')
}

module.exports.post_register = function (req, res) {
    // let user = Users({
    //     username: req.body.username,
    //     password: req.body.password,
    //     email: req.body.email,
    //     role: 0 
    // })
    // user.save();
    res.render('register')
}