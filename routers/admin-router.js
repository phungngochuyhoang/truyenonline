const express = require('express');
const { render } = require('pug');

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

module.exports = router;
