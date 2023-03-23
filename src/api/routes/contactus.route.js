const express = require('express');
const verifyUser = require('../../middleware/verifyToken.js');
const router = express.Router();
const contactus = require('../controllers/contactus.controller.js');

//create contact
router.post('/create', contactus().createcontactus)

router.use(verifyUser)
//view all contacts
router.get('/listall', contactus().allcontactus)

module.exports = router;