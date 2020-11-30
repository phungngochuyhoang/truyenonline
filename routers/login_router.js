const express = require('express');

const controllers = require('../controllers/login_controller');

const router = express.Router();


router.get('/login', controllers.get_login);


module.exports = router;