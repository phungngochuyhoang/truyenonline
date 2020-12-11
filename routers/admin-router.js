const express = require('express');
const multer = require('multer');

const upload = multer({dest: 'public/uploads'}).single('avatar');


const controllers = require('../controllers/admin_controller');


const router = express.Router();


// admin
router.get('/', controllers.get_admin)
// exit
router.get('/exit', controllers.get_exit)
// category
router.get('/category', controllers.get_category)
// add category
router.get('/category/add', controllers.get_addCategory)
router.post('/category/add', controllers.post_addCategory)
// edit category 
router.get('/category/edit/:id', controllers.get_updateCategory)
router.post('/category/edit/:id', controllers.post_updateCategory)
// delete category
router.get('/category/del/:id', controllers.get_delCategory)
router.post('/category/del/:id', controllers.post_delCategory)
// search category
router.get('/category/search', controllers.get_search_category)
// post stories
router.get('/post', controllers.get_post_stories)
// create stories
router.get('/post/create', controllers.get_create_stories)
router.post('/post/create', upload, controllers.post_create_stories)
// edit stories
router.get('/post/edit/:id', controllers.get_updateStory)
router.post('/post/edit/:id', upload, controllers.post_updateStory)
// delete story
router.get('/post/del/:id', controllers.get_delStory)
router.post('/post/del/:id', controllers.post_delStory)


// data story
router.post('/post/data/:id', controllers.post_data)
router.post('/post/data', controllers.post_datas);

module.exports = router;
