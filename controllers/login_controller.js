
const User = require('../models/user_model');

module.exports.get_login = function (req, res) {
    res.render('login')
}

module.exports.post_login = function(req, res) {
    res.redirect('admin')
}

