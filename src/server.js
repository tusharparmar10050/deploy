const express = require('express');
const mysql = require('mysql');
const apiRoute = require('./api/index.js')

const app = express();
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000


//middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoute)
app.get('/health', function (req, res) {
    return res.send('Ok, Working fine.');
  });

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("on port " + port)
    }
})

module.exports = app;