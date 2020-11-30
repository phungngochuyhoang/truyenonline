const express = require('express');

const controllers = require('../controllers/register_controller');


const router = express.Router();


router.get('/register', controllers.get_register);

router.post('/register', controllers.post_register);


module.exports = router;