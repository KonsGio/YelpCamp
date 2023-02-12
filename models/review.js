const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number
});

// One to many relationships
module.exports = mongoose.model('Review', reviewSchema);