const express = require('express');
const multer = require('multer');

const upload = multer({dest: 'public/uploads'}).single('avatar');

const controllers = require('../controllers/user_controller');

const router = express.Router();
// exit
router.get('/exit', controllers.get_exit)
// profile
router.get('/profile', controllers.get_profile)	
router.post('/profile', upload, controllers.post_profile)
// view category
router.get('/category/:id', controllers.get_category)
// view page story
router.get('/story/:id',  controllers.get_story)
// view chapter
router.get('/chapter/:id', controllers.get_chapter)
// function follow
router.post('/story/:id', controllers.post_functionFollow)
// view new stories
router.get('/truyenmoi', controllers.get_newStories);
// view top stories
router.get('/truyenhoanthanh', controllers.get_successStories)
// view success stories
router.get('/bangxephang', controllers.get_topStories)
// search 
router.get('/search', controllers.get_searchStoriesIndex)
// error 
router.get('/error', controllers.get_error)

// comments
router.post('/story/:id', controllers.post_comments)

// data
router.post('/post/data', controllers.datas)
router.post('/post/dataFollow/:id', controllers.post_dataFollow)

module.exports = router