const express = require('express');

const controllers = require('../controllers/admin_controller');

const router = express.Router();


router.get('/', controllers.get_admin);


module.exports = router;
