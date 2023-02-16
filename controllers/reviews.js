const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success','Thank you for your review!')
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    // using mongo $pull to remove review associated with specific id
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: { review: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Your review has been deleted!')
    res.redirect(`/campgrounds/${id}`);
}