const express = require('express');

const controllers = require('../controllers/login_controller');
const auth_middleware = require('../middlewares/auth_login_middleware');

const router = express.Router();


router.get('/login', controllers.get_login)

router.post('/login', auth_middleware.auth_login, controllers.post_login)


module.exports = router;