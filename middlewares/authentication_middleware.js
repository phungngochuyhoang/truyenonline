
module.exports.auth = function(req, res, next) {
    let error = [];
    if(!req.body.username) {
        error.push('username is required')
    }


    if (error.length > 0) {
        res.render({
            err: error            
        })
    }

    next();
}

