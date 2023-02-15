const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
require('dotenv').config();

// This is a developing database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
// Checking if the connection is made
const db = mongoose.connection;
db.on('error',console.error.bind(console, "Connection error"));
db.once('open', () => {
    console.log('Database connection established');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) +10;
        const camp = new Campground({
            author: '63ecea7bd26fca55d8d3ca9a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis voluptatem voluptate placeat itaque consequatur ipsum nam nulla similique temporibus, ipsa accusamus? Distinctio possimus numquam voluptates, veniam iusto ipsam quasi vitae.',
            price
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
})