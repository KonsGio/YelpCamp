const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const Campground = require('./models/campground');
require('dotenv').config();

// This is a developing database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
// Checking if the connection is made
const db = mongoose.connection;
db.on('error',console.error.bind(console, "Connection error"));
db.once('open', () => {
    console.log('Database connection established');
})

const app = express();

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// parsing body data
app.use(express.urlencoded({ extended: true}));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('home');
})

// Showing all campgrounds
app.get('/campgrounds', catchAsync (async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}))

// Adding a new campground page
app.get('/campgrounds/new', (req, res) => {
    res. render('campgrounds/new')
})

//  --------------------------------
app.post('/campgrounds', catchAsync (async (req, res, next) => {
    if(!req.body.campground) throw new ExpressError('Incomplete Campground Data', 400);
        const campground = new Campground(req.body.campground);
        await campground.save();
        res.redirect(`/campgrounds/${campground._id}`);
}))

// Showing campground by id
app.get('/campgrounds/:id', catchAsync (async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground});
}))

// Editing campground by id
app.get('/campgrounds/:id/edit', catchAsync (async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
}))

// Updating campground by id
app.put('/campgrounds/:id', catchAsync (async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
}))

// Deleting campground by id
app.delete('/campgrounds/:id', catchAsync (async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))

// Passing a new ExpressError to next * means that all other error checks passed through ok
// It means that campgrounds/anything is an error with 404 status
app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})

// Showing generic error message
app.use((err, req, res, next) => {
    // taking statusCode and message from catchAsync with default values
    const {statusCode = 500, message = 'Something went wrong'} = err;
    res.status(statusCode).send(message);
    res.send('Oh Boy something went wrong');
});

// start with nodemon app.js
app.listen(3000, () => {
    console.log('listening on port 3000');
})
