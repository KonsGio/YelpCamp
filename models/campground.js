const mongoose = require('mongoose');
// Creating Schema as a reference to be used in the app
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema ({
    title: String,
    price: String,
    description: String,
    location: String,
});

module.exports = mongoose.model('Campground', CampgroundSchema);

