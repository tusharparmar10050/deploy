const express = require('express');
const verifyUser = require('../../middleware/verifyToken.js');
const router = express.Router();
const newsletter = require('../controllers/newsletter.controller.js');

router.post('/create', newsletter().createNewsletter)

router.use(verifyUser)
router.get('/listall', newsletter().allNewsletter)

module.exports = router;