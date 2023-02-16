const mongoose = require('mongoose');
const Review = require('./review');
// Creating Schema as a reference to be used in the app
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/c_scale,w_150');
});

const CampgroundSchema = new Schema ({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            // Object ID from a Review Model (revie.js) Redirecting to
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

// Using findOneAndDelete method to remove any review associated with particular deleted campground 
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Review.remove({
            _id:{
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', CampgroundSchema);

