require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

// Distructuring schema because we need multiple schemas
// const {campgroundSchema} = require('./schemas.js');
// const {reviewSchema} = require('./schemas.js');

const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

// This is a developing database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
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

// Telling express to serve public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serving router files
app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);



app.get('/', (req, res) => {
    res.render('home');
})


// Passing a new ExpressError to next * means that all other error checks passed through ok
// It means that campgrounds/anything is an error with 404 status
app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})

// Showing generic error message
app.use((err, req, res, next) => {
    // taking statusCode and message from catchAsync with default values
    const {statusCode = 500} = err;
    if(!err.message) err.message = 'Oh no something bad happened'
    // Passing err to the error template
    res.status(statusCode).render('error', {err});   
})

// start with nodemon app.js
app.listen(3000, () => {
    console.log('listening on port 3000');
})
