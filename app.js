const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
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

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({title: 'My Backyard', description: 'cheap camping'});
    await camp.save();
    res.send(camp);
})

// start with nodemon app.js
app.listen(3000, () => {
    console.log('listening on port 3000');
})
