const Category = require('../models/category_model');
const Story = require('../models/stories_model');
const Chapter = require('../models/chapter_model');
const User = require('../models/user_model');
const Follow = require('../models/follow_model');
const Comment = require('../models/comment_model');

// view profile
module.exports.get_profile = async function (req, res) {
	let user = await User.find({_id: req.signedCookies.userid})
	let dataCategory = await Category.find()
	let dataFollow = await Follow.find({userId: req.signedCookies.userid})
	let follow = dataFollow.map(item => {
		return item.storyId;
	})
	let dataStories = await Story.find();
	let arr= [];
	dataStories.forEach((item) => {
		for(var value of follow) {
			if(String(item._id) === value) {
				arr.push(item);
			}
		}
	})
	res.render("page-profile", {
		user: user[0],
		category: dataCategory,
		follow: arr
	})
}
module.exports.post_profile = function(req, res) {
	console.log(req.body);
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
	let dataStories = await Story.find()
	let name = await Category.find({_id: req.params.id});
	let newData = dataStories.filter((item => {
		return item.categories_name.indexOf(name[0].name) !== -1
	}))
	res.render("page-cat", {
		user: user[0],
		category: dataCategory,
		data: newData,
		nameCat: name[0].name
	})
}
// view story
module.exports.get_story = async function (req, res)  {
	let user = await User.find({_id: req.signedCookies.userid})
	let dataCategory = await Category.find()
	let dataStory = await Story.find({_id: req.params.id}) 
	let dataChapter = await Chapter.find({id_story: req.params.id})
	let userId = req.signedCookies.userid;
	let dataFollow = await Story.find().sort({createDay: -1}).limit(10);
	res.render("page-story", {
		user: user[0],
		category: dataCategory,
		story: dataStory[0],
		chapLen: dataChapter.length,
		chapter: dataChapter,
		showHidFollow: !userId ? " " : "user-follow",
		dataFollow: dataFollow
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
// function follow
module.exports.post_functionFollow = async function(req, res) {
	let follow = await Follow.find({$and: [
		{userId: req.signedCookies.userid},
		{storyId: req.body.story_id}
	]})
	if(follow.length === 0) {
		Follow({
			userId: req.signedCookies.userid,
			storyId: req.params.id,
			status: true,
		}).save();
	}else if(req.params.id === follow[0].storyId) {
		Follow.updateOne({$and: [
			{userId: req.signedCookies.userid},
			{storyId: req.body.story_id}
		]},{$set:{
			userId: req.signedCookies.userid,
			storyId: req.params.id,
			status: !follow[0].status,
		}}).then(data=>data).catch(err=>err)
	}
}
module.exports.post_dataFollow = async function(req, res) {
	let follow = await Follow.find({storyId: req.params.id});
	res.json(follow);
}
// function comment
module.exports.post_comments = async function(req, res) {

	console.log(req.body)
	res.send("a")
}
// new stories
module.exports.get_newStories = async function(req, res) {
	let user = await User.find({_id: req.signedCookies.userid})
	let dataCategory = await Category.find()
	let dataStories = await Story.find().sort({createDay: -1}).limit(20)
	res.render('page-newStories', {
		user: user[0],
		category: dataCategory,
		story: dataStories
	})
}
// top
module.exports.get_topStories = async function(req, res) {
	let user = await User.find({_id: req.signedCookies.userid})
	let dataCategory = await Category.find()
	let dataFollow = await Follow.find();
	let obj = dataFollow.map((item) => {
		return item.storyId
	})
	var handleDataFollow = obj.reduce(function(accumulator, currentValue){
		if(typeof accumulator[currentValue] !== "undefined"){
			accumulator[currentValue]++; 
			return accumulator;
		} else {
				accumulator[currentValue]=1; 
				return accumulator;
		}
	}, {});
	var sortable = [];
	for (var vehicle in handleDataFollow) {
			sortable.push([vehicle, handleDataFollow[vehicle]]);
	}
	sortable.sort(function(a, b) {
			return b[1] - a[1];
	});
	var top = sortable.map((item) => {
		return item[0];
	})
	let dataStories= [];
	for(var value of top) {
		dataStories.push(await Story.find({_id: value}).limit(10))
	}

	res.render('page-topStories', {
		user: user[0],
		category: dataCategory,
		story: dataStories
	})
}
// success story
module.exports.get_successStories = async function(req, res) {
	let user = await User.find({_id: req.signedCookies.userid})
	let dataCategory = await Category.find()
	let dataStories = await Story.find({statusFinishAndUnfinished: true});
	res.render('page-successStories',{
		user: user[0],
		category: dataCategory,
		story: dataStories
	})
}
// search story
module.exports.get_searchStoriesIndex = async function(req, res) {
	let dataStory = await Story.find({name: req.query['story-name'].toUpperCase()});
	if(dataStory.length === 0) {
		res.redirect('/error')
		return;
	}
	res.redirect('/story/' + dataStory[0]._id)
}
// error
module.exports.get_error = function(req, res) {
	res.render('layout/error')
}