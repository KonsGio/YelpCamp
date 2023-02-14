const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const {campgroundSchema} = require('../schemas.js');

// Middleware function to use JOI anywhere adding it to function as such (validateCampground, catchAsync)
const validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next();
    }
}

// Showing all campgrounds
router.get('/', catchAsync (async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}))

// Adding a new campground page
router.get('/new', (req, res) => {
    res. render('campgrounds/new')
})

//  --------------------------------
router.post('/', validateCampground, catchAsync (async (req, res, next) => {
    // if(!req.body.campground) throw new ExpressError('Incomplete Campground Data', 400);

        const campground = new Campground(req.body.campground);
        await campground.save();
        res.redirect(`/campgrounds/${campground._id}`);
}))

// Showing campground by id
router.get('/:id', catchAsync (async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    res.render('campgrounds/show', {campground});
}))

// Editing campground by id
router.get('/:id/edit', catchAsync (async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
}))

// Updating campground by id
router.put('/:id', validateCampground, catchAsync (async (req, res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
}))

// Deleting campground by id
router.delete('/:id', catchAsync (async (req, res) => {
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))


module.exports = router;
