const mongoose = require('mongoose');
// Creating Schema as a reference to be used in the app
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema ({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    reviews: [
        {
            // Object ID from a Review Model (revie.js) Redirecting to
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

module.exports = mongoose.model('Campground', CampgroundSchema);

