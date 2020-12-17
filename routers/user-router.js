const express = require('express');

const controllers = require('../controllers/user_controller');

const router = express.Router();

router.get('/exit', controllers.get_exit)

router.get('/profile', controllers.get_profile)	

router.get('/category/:id', controllers.get_category)

router.get('/story/:id',  controllers.get_story)

router.get('/chapter/:id',controllers.get_chapter)

// data
router.post('/post/data', controllers.datas)

module.exports = router