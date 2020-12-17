require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const login_router = require('./routers/login_router');
const register_router = require('./routers/register_router');
const admin_router = require('./routers/admin-router');
const user_router = require('./routers/user-router');
const auth_userId = require('./middlewares/auth_userId_middleware');
const User = require('./models/user_model');
const Category = require('./models/category_model');
const Stories = require('./models/stories_model');

// set middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser(process.env.SECRET_COOKIE))

// set template pug
app.set('view engine', 'pug');

// set file static 
const public = express.static('public');
app.use(public);
app.use('/admin', public);
app.use('/admin/users/', public)
app.use('/admin/user/edit', public)
app.use('/admin/user/del', public)
app.use('/admin/category/', public);
app.use('/admin/category/add', public);
app.use('/admin/category/edit/:id', public)
app.use('/admin/category/del/:id', public)
app.use('/admin/post', public)
app.use('/admin/post/edit', public)
app.use('/admin/post/del', public)
app.use('/admin/post/del/:id', public)
app.use('/admin/chapter', public)
app.use('/admin/chapter/:id', public)	
app.use('/category/:id', public)
app.use('/story/:id', public)
app.use('/chapter/:id', public)
app.use('/login', public)
app.use('/register', public)

// router
app.get('/', async (req, res) => {
		let user = await User.find({_id: req.signedCookies.userid})
		let dataCategory = await Category.find();
		let slides = await Stories.find().sort({createDay: -1}).limit(4)
		let doc = await Stories.find().sort({createDay: -1}).skip(4).limit(6)
		let top = await Stories.find().sort({createDay: -1}).limit(10)
    res.render('index', {
				user: user[0],
				category: dataCategory,
				slides: slides,
				doc: doc,
				top: top
    });
})




app.use(login_router);
app.use(register_router);
app.use('/admin', auth_userId.auth_userId, admin_router);
app.use(user_router);

// listen
app.listen('3000');

// connect database
mongoose.connect(process.env.URI_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('connect to database');
})


