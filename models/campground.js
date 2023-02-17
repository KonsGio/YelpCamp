const mongoose = require('mongoose');
const Review = require('./review');
// Creating Schema as a reference to be used in the app
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_150');
});

const opts = { toJSON: { virtuals: true } };


const CampgroundSchema = new Schema ({
    title: String,
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
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
},opts);

CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`
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

