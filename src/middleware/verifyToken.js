const con = require('../config/database.js')
require("dotenv").config();
const jwt = require('jsonwebtoken')
const createError = require('../helper/error.js')
const authModule = require('../modules/auth.js')

function verifyUser(req, res, next) {
  const id = req.headers['id'];
  const jwt_token = req.headers['token'];

  authModule.verifyUser(jwt_token, (error, user) => {
    if (!user) {
      return res.status(401).json({
        message: 'Error getting to verify user',
      });
    }
    else {
      next();
    }
  })

}

module.exports = verifyUser
