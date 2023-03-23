const verifyUser = require("../../middleware/verifyToken.js");
const Blog = require("../controllers/blog.controller.js");
const router = require('express').Router();

router.get("/:id", Blog().getBlog);
router.get("/", Blog().getallBlog);

router.use(verifyUser)
router.post("/create" ,Blog().createBlog);
router.put("/:id" ,Blog().updateBlog);
router.delete("/:id",Blog().deleteBlog);



module.exports = router;