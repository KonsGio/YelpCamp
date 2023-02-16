const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');

// Showing all campgrounds
router.get('/', catchAsync(campgrounds.index));

// Adding a new campground page
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

//  --------------------------------
router.post('/', isLoggedIn, validateCampground, catchAsync (campgrounds.createCampground));

// Showing campground by id ----- populating review data and author data for use  in templates
router.get('/:id', catchAsync (campgrounds.showCampground));

// Editing campground by id
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync (campgrounds.editCampground));

// Updating campground by id
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync (campgrounds.updateCampground));

// Deleting campground by id
router.delete('/:id', isLoggedIn, isAuthor, catchAsync (campgrounds.deleteCampground));


module.exports = router;
