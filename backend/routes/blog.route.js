const express = require('express');
const router = express.Router();
const blogController = require("../controllers/blog.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/blog", authMiddleware.authCoach, blogController.createBlog);

router.get("/blogs", blogController.getAllBlogs);

module.exports = router;
