const express = require('express');
const verifyUser = require("../middleware/verifyToken.js");

const apiRouter = express.Router();

apiRouter.use('/auth', require('./routes/auth.route.js'));
apiRouter.use('/contact-us', require('./routes/contactus.route.js'));
apiRouter.use('/user', require('./routes/user.route.js'));
apiRouter.use('/blog', require('./routes/blog.route.js'));
apiRouter.use('/newsletter', require('./routes/newsletter.route.js'));

module.exports = apiRouter;