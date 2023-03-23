const Auth = require("../controllers/auth.controller.js");
const router = require('express').Router();
const verifyUser = require("../../middleware/verifyToken.js");

router.post("/register", Auth().createUser);
router.post("/login", Auth().loginUser);
router.post("/logout", Auth().logOutuser);


module.exports = router;