const Category = require('../models/category_model');
// admin
module.exports.get_admin = function (req, res) {
  res.render('admin/admin');
}
// exit
module.exports.get_exit = function (req, res) {
  res.clearCookie('userid');
  res.redirect('/');
}
// category 
module.exports.get_category = async function (req, res) {
	let dataCategory = await Category.find();
  res.render('admin/category/category', {
		title: 'Category',
		data: dataCategory
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
module.exports.post_delCategory = function (req, res) {
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