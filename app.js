const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('Hello, world!');
})
// start with nodemon app.js
app.listen(3000, () => {
    console.log('listening on port 3000');
})

