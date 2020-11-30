require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const login_router = require('./routers/login_router');
const register_router = require('./routers/register_router');
const admin_router = require('./routers/admin-router');


// set template pug
app.set('view engine', 'pug');

// set middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

// set file static 
app.use(express.static('public'));

// router
app.get('/', (req, res) => res.render('index'))
app.use(login_router);
app.use(register_router);
app.use('/admin', admin_router);

// listen
app.listen('3000');

// connect database
mongoose.connect('mongodb+srv://admin:Hoang0935418109@doantotnghiep.gpspg.mongodb.net/truyenonline', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('connect to database');
})


