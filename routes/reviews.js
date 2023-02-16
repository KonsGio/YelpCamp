const express = require("express");
// To merge params from here to app.use('/campgrounds/:id/reviews', reviews);
// in app.js and granting access to review campground id
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const campgrounds = require('../controllers/reviews');
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware");



// Submitting the review form to this url
router.post('/', isLoggedIn, validateReview, catchAsync (campgrounds.createReview))

// Deleting reviews by id
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(campgrounds.deleteReview))

module.exports = router;