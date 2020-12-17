const Category = require('../models/category_model');
const Story = require('../models/stories_model');
const Chapter = require('../models/chapter_model');
const User = require('../models/user_model');

// view profile
module.exports.get_profile = async function (req, res) {
	let user = await User.find({_id: req.signedCookies.userid})
	let dataCategory = await Category.find()
	res.render("page-profile", {
		user: user[0],
		category: dataCategory,
	})
}
// exits
module.exports.get_exit = (req, res) => {
	res.clearCookie('userid');
  res.redirect('/');
}
// post data
module.exports.datas = async function(req, res) {
	let dataStories = await Story.find().sort({createDay: -1});
	res.json(dataStories)
}
// view category
module.exports.get_category = async function (req, res) {
	let user = await User.find({_id: req.signedCookies.userid})
	let dataCategory = await Category.find()
	res.render("page-cat", {
		user: user[0],
		category: dataCategory,
	})
}
// view story
module.exports.get_story = async function (req, res)  {
	let user = await User.find({_id: req.signedCookies.userid})
	let dataCategory = await Category.find()
	let dataStory = await Story.find({_id: req.params.id}) 
	let dataChapter = await Chapter.find({id_story: req.params.id})
	let userId = req.signedCookies.userid;
	res.render("page-story", {
		user: user[0],
		category: dataCategory,
		story: dataStory[0],
		chapLen: dataChapter.length,
		chapter: dataChapter,
		showHidFollow: !userId ? " " : "user-follow"
	})
}
// view chapter
module.exports.get_chapter = async function (req, res) {
	let dataChapter = await Chapter.find({_id: req.params.id})
	let arr = await Chapter.find({id_story: dataChapter[0].id_story});
	let a = [];
	arr.forEach((item) => {
		a.push(item._id);

	})
	let linkNext;
	a.forEach((item, index) => {
		if(item._id == req.params.id) {
			linkNext = a[index+1]
		}
	})
	let linkPrev;
	a.forEach((item, index) => {
		if(item._id == req.params.id) {
			linkPrev = a[index-1]
		}
	})
	let position;
	a.forEach((item, index) => {
		if(item._id == req.params.id) {
			position= index;
		}
	})


	res.render('page-chapter', {
		chapter: dataChapter,
		nextid: linkNext,
		previd: linkPrev,
		first: position
	});
}