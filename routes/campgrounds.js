const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');

// Multer is a middleware for multipart/form-data
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});


// Grouping route
router.route('/')
// Showing all campgrounds
    .get(catchAsync(campgrounds.index))
// Adding a new campground page
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
    

    // Adding a new campground page
router.get('/new', isLoggedIn, campgrounds.renderNewForm)


// Grouping id routes
router.route('/:id')
// Showing campground by id ----- populating review data and author data for use  in templates    
    .get(catchAsync(campgrounds.showCampground))
// Updating campground by id
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
// Deleting campground by id
    .delete(isLoggedIn, isAuthor, catchAsync (campgrounds.deleteCampground))


// Editing campground by id
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync (campgrounds.editCampground));


module.exports = router;
