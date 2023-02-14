const express = require("express");

// To merge params from here to app.use('/campgrounds/:id/reviews', reviews);
// in app.js and granting access to review campground id
const router = express.Router({mergeParams: true});

const catchAsync = require('../utils/catchAsync');

const Campground = require('../models/campground');
const Review = require('../models/review');
const {reviewSchema} = require('../schemas.js');

const ExpressError = require('../utils/ExpressError');


// Middleware for reviews
const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next();
    }
}

// Submitting the review form to this url
router.post('/', validateReview, catchAsync (async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))

// Deleting reviews by id
router.delete('/:reviewId', catchAsync(async (req, res) => {
    // using mongo $pull to remove review associated with specific id
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: { review: reviewId}});
    await Review.findByIdAndDelete(req.params.reviewId);
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;