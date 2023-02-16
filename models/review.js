const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
});

// One to many relationships
module.exports = mongoose.model('Review', reviewSchema);