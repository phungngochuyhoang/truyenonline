const express = require('express');

const controllers = require('../controllers/register_controller');
const auth_middleware = require('../middlewares/auth_register_middleware');


const router = express.Router();


router.get('/register', controllers.get_register);

router.post('/register', auth_middleware.auth_register, controllers.post_register);


module.exports = router;