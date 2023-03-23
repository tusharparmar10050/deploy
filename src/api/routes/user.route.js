const User = require("../controllers/user.controller.js");
const router = require('express').Router();
const verifyUser = require("../../middleware/verifyToken.js");


router.use(verifyUser);
router.put("/:id", User().updateUser);
router.delete("/:id",User().deleteUser);



module.exports = router;