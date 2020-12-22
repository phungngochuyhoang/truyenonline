const md5 = require('md5');
const Category = require('../models/category_model');
const Story = require('../models/stories_model');
const Chapter = require('../models/chapter_model');
const User = require('../models/user_model');

//  only one data story
module.exports.post_data = async function (req, res) {
	let dataStories = await Story.find({_id: req.params.id});
	res.json(dataStories)
}
// data stories 
module.exports.post_datas = async function (req, res) {
	let dataStories = await Story.find().sort({createDay: -1});
	res.json(dataStories)
}
// admin
module.exports.get_admin = async function (req, res) {
	let user = await User.find({_id: req.signedCookies.userid})
  res.render('admin/admin', {
		img: user[0].avatar
	});
}
// exit
module.exports.get_exit = function (req, res) {
  res.clearCookie('userid');
  res.redirect('/');
}
// category 
module.exports.get_category = async function (req, res) {
	let dataCategory = await Category.find();
	let user = await User.find({_id: req.signedCookies.userid})
  res.render('admin/category/category', {
		title: 'Category',
		data: dataCategory,
		img: user[0].avatar
	})
}
// add category 
module.exports.get_addCategory = function (req, res) {
	res.render('admin/category/add_category')
}
module.exports.post_addCategory = function (req, res) {
	let category = Category({
		name: req.body.add_name,
		note: req.body.note
	})
	category.save()
	res.redirect('/admin/category');
}
// update category
module.exports.get_updateCategory = function (req, res) { 
	Category.findOne({_id: req.params.id})
		.then((data) => {
			res.render('admin/category/edit_category', {
				name: data.name,
				note: data.note
			})
		})
		.catch(err => console.log(err))
}
module.exports.post_updateCategory = function (req, res) {
	Category.updateOne({_id: req.params.id}, {$set: {
		name: req.body.edit_name,
		note: req.body.note
	}}).then(data => data).catch(err => err)
	res.redirect('/admin/category')
}
// delete category
module.exports.get_delCategory = async function (req, res) { 
	let category = await Category.find({_id: req.params.id})
	res.render('admin/category/del_category', {
		name: category[0].name
	})
}
module.exports.post_delCategory =  function (req, res) {
	Category.deleteOne({_id: req.params.id})
	.then(data => data)
	.catch(err => err)
	res.redirect('/admin/category')
}
// search category name
module.exports.get_search_category = async function (req, res) {
	let name = req.query.category_story;
	let findName = await (await Category.find()).filter((item) => {
		return item.name.indexOf(name) !== -1 || item.name.toLocaleLowerCase().indexOf(name) !== -1 || item.name.toUpperCase().indexOf(name) !== -1;
	});
	res.render('admin/category/category', {
		title: 'Category',
		data: findName
	})
}
// post post stories
module.exports.get_post_stories = async function (req, res) {
	let dataStories = await Story.find().sort({createDay: -1});
	let user = await User.find({_id: req.signedCookies.userid})
	res.render('admin/posts/post', {
		stories: dataStories,
		img: user[0].avatar
	})
}
// create post stories
module.exports.get_create_stories = async function (req, res) {
	let dataCategory = await Category.find();
	res.render('admin/posts/create_post', {
		category: dataCategory
	})
}
module.exports.post_create_stories = function (req, res) {
	req.body.avatar = req.file.path.split('\\').slice(1).join('\\');
	!req.body.status ? req.body.status = false : req.body.status = true;
	req.body['result-categories'] = req.body['result-categories'].split(', ');
	Story({
		name: req.body.add_name,
		author: req.body.author,
		categories_name: req.body['result-categories'],
		avatar: req.body.avatar,
		note: req.body.note,
		statusShowHide: req.body.status,
		statusFinishAndUnfinished: false
	}).save()
	res.redirect('/admin/post')
}
// edit post story
module.exports.get_updateStory = async function (req, res) { 
	let dataCategory = await Category.find();
	let dataStories = await Story.find({_id: req.params.id});
	res.render('admin/posts/edit_post', {
		story: dataStories[0],
		category: dataCategory
	})
}
module.exports.post_updateStory = function (req, res) {
	!req.body.status ? req.body.status = false : req.body.status = true;
	!req.body.statusSuccess ? req.body.statusSuccess = false : req.body.statusSuccess = true;
	let dataNew = {
		name: req.body.add_name,
		author: req.body.author,
		categories: req.body['result-categories'].split(', '),
		avatar: req.body.avatar_edit.indexOf('uploads') !== -1 ? req.body.avatar_edit : req.file.path.split('\\').slice(1).join('\\'),
		note: req.body.note,
		status: req.body.status,
		statusSuccess: req.body.statusSuccess
	}
	Story.updateOne({_id: req.params.id}, {$set: {
		category_name: dataNew.categories,
		name: dataNew.name,
		author: dataNew.author,
		avatar: dataNew.avatar,
		note: dataNew.note,
		statusShowHide: dataNew.status,
		statusFinishAndUnfinished: dataNew.statusSuccess
	}}).then((data) => data).catch(err => err)
	res.redirect('/admin/post')
}
// delete post story
module.exports.get_delStory = async function (req, res) { 
	let dataStories = await Story.findOne({_id: req.params.id});
	res.render('admin/posts/del_post', {
		story: dataStories
	});
}
module.exports.post_delStory = function (req, res) {
	Story.deleteOne({_id: req.params.id})
	.then(data => {
		if(data.ok) {
			Chapter.deleteMany({id_story: req.params.id})
			.then(data => data)
			.catch(err => err)
		}
	})
	.catch(err => err)
	res.redirect('/admin/post')
}
// chapter story
module.exports.get_chapters = async function (req, res) {
	let chapters = await Chapter.find({id_story: req.params.id});
	let user = await User.find({_id: req.signedCookies.userid})
	res.render('admin/chapters/chapter', {
		id: req.params.id,
		data: chapters,
		img: user[0].avatar
	})
}
// create chapter
module.exports.get_newChapter = function (req, res) {
	res.render('admin/chapters/new-chapters', {
		id: req.params.id,
	})
}
module.exports.post_newChapter = function (req, res) {
	Chapter({
		id_story: req.params.id,
		name: req.body['name-chapter'],
		content: req.body.content
	}).save()
	res.redirect('/admin/chapter/' + req.params.id)
}

// edit chapter
module.exports.get_editChapter = async function (req, res) {
	let chapter = await Chapter.find({_id: req.params.id});
	res.render('admin/chapters/edit-chapter', {
		data: chapter[0]
	})
}
module.exports.post_editChapter = async function (req, res) {
	let chapter = await Chapter.find({_id: req.params.id});
	let id = chapter[0].id_story;
	Chapter.updateOne({_id: req.params.id}, {$set: {
		name: req.body['name-chapter'],
		content: req.body.content
	}}).then((data) => data).catch(err => err)
	res.redirect('/admin/chapter/' + id)
}
// delete chapter
module.exports.get_delChapter = async function (req, res) {
	let chapter = await Chapter.find({_id: req.params.id});
	res.render('admin/chapters/del-chapter', {
		data: chapter[0],
	})
}
module.exports.post_delChapter = async function (req, res) {
	let chapter = await Chapter.find({_id: req.params.id});
	let id = chapter[0].id_story;
	Chapter.deleteOne({_id: req.params.id})
	.then(data => data)
	.catch(err => err)
	res.redirect('/admin/chapter/' + id)
}
// view user
module.exports.get_users = async function (req, res) {
	let dataUser = await User.find();
	res.render('admin/users/manager-users', {
		users: dataUser,
		img: dataUser[0].avatar
	});
}
// create user
module.exports.get_createUser = function (req, res) {
	res.render('admin/users/create-user');
}

module.exports.post_createUser = async function (req, res) {
	req.body.avatar = req.file.path.split('\\').slice(1).join('\\');
	console.log(req.body)
	User({
		username: req.body.username,
		password:	md5(req.body.password),
		email: req.body.email,
		role: parseInt(req.body.role),
		avatar: req.body.avatar
	}).save()
	res.redirect("/admin/users");
}
// edit user
module.exports.get_editUser = async function (req, res) {
	let userData = await User.find({_id: req.params.id})
	res.render('admin/users/edit-user', {
		user: userData
	})
}
module.exports.post_editUser = async function (req, res) {
	console.log(req.body)
	let data = {
		username: req.body.username,
		password: req.body.password,
		email: req.body.email,
		avatar: req.body.avatar_edit.indexOf('uploads') !== -1 ? req.body.avatar_edit : req.file.path.split('\\').slice(1).join('\\'),
		role: req.body.role,
	}
	User.updateOne({_id: req.params.id},{$set: {
			username: data.username,
			password: data.password,
			email: data.email,
			avatar: data.avatar,
			role: data.role
	}})
	.then((data) => data)
	.catch((error) => error)
	res.redirect("/admin/users")
}
// del user
module.exports.get_delUser = async function (req, res) {
	let user = await User.find({_id: req.params.id})
	res.render('admin/users/del-user', {
		username: user[0]
	})
}
module.exports.post_delUser = async function (req, res) {
	User.deleteOne({_id: req.params.id})
	.then(data => data)
	.catch(err => err)
	res.redirect('/admin/users/')
}