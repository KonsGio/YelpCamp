const express = require("express");
// To merge params from here to app.use('/campgrounds/:id/reviews', reviews);
// in app.js and granting access to review campground id
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const { isLoggedIn, validateReview } = require("../middleware");



// Submitting the review form to this url
router.post('/', isLoggedIn, validateReview, catchAsync (async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success','Thank you for your review!')
    res.redirect(`/campgrounds/${campground._id}`);
}))

// Deleting reviews by id
router.delete('/:reviewId', isLoggedIn, catchAsync(async (req, res) => {
    // using mongo $pull to remove review associated with specific id
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: { review: reviewId}});
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success','Your review has been deleted!')
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;