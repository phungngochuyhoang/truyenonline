
const User = require('../models/user_model');

module.exports.auth_userId = async function(req, res, next) {
    let userId = req.signedCookies.userid;
    if(!userId) {
        res.redirect('login');
        return;
    }
    let userCookie = await User.find({_id: userId})
    if(!userCookie) {
			res.redirect('login') 
			return;
    }
    if(userCookie[0].role === 0) {
        res.redirect('/') 
        return;
		}
    next()
}
