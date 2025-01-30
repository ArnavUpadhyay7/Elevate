const express = require('express');
const router = express.Router();
const blogController = require("../controllers/blog.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/blog", authMiddleware.authCoach, blogController.createBlog);

router.get("/blogs", blogController.getAllBlogs);

router.post('/:id/like', authMiddleware.authPlayer, blogController.likeBlog);

router.post('/:id/comment', authMiddleware.authPlayer, blogController.addComment);

router.delete('/:id', blogController.deleteBlog);

module.exports = router;
