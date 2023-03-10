if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

// For setting up cookies
const session = require('express-session');
// For setting up flash
const flash = require('connect-flash');

// Distructuring schema because we need multiple schemas
// const {campgroundSchema} = require('./schemas.js');
// const {reviewSchema} = require('./schemas.js');

const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');


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

app.use(mongoSanitize());

const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

// Configuring sessions
const sessionConfig = {
    name:'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 ,
        maxAge: 1000 * 60 * 60 
    }
}

app.use(session(sessionConfig));
// Setting up flash
app.use(flash());

// Middleware for persistent loging sessions
app.use(passport.initialize());
app.use(passport.session());

// Using local strategy in User model called authenticate
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // From passport mongoose plugin
passport.deserializeUser(User.deserializeUser()); 

// Setting middleware access
app.use((req, res, next) => {
    // console.log(req.session);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Serving router files
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);
app.use('/', userRoutes);




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

const port = process.env.PORT || 3000;
// start with nodemon app.js
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
