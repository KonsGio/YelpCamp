const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const {campgroundSchema} = require('../schemas.js');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');


// Showing all campgrounds
router.get('/', catchAsync (async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}))

// Adding a new campground page
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new')
})

//  --------------------------------
router.post('/', isLoggedIn, validateCampground, catchAsync (async (req, res, next) => {
    // if(!req.body.campground) throw new ExpressError('Incomplete Campground Data', 400);
    
    const campground = new Campground(req.body.campground);
    // Holding in the author id
    campground.author = req.user._id;
    await campground.save();
    // Flash success message
        req.flash('success',`${campground.title} successfully created!`)
        res.redirect(`/campgrounds/${campground._id}`);
}))

// Showing campground by id ----- populating review data and author data for use  in templates
router.get('/:id', catchAsync (async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews').populate('author');
    if(!campground){
        req.flash('error','Campground does not exist!')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground});
}))

// Editing campground by id
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync (async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground){
        req.flash('error','Campground does not exist!')
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', {campground});
}))

// Updating campground by id
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync (async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    req.flash('success',`${campground.title} successfully updated!`)
    res.redirect(`/campgrounds/${campground._id}`);
}))

// Deleting campground by id
router.delete('/:id', isLoggedIn, isAuthor, catchAsync (async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success','Campground successfully deleted!')
    res.redirect('/campgrounds');
}))


module.exports = router;
