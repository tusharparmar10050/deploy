const nodemailer = require('nodemailer');
require("dotenv").config();


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD,
    }
});

module.exports = transporter