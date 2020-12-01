
module.exports.get_admin = function (req, res) {
    res.render('admin/admin');
}

module.exports.get_exit = function (req, res) {
    res.clearCookie('userid');
    res.redirect('/');
}