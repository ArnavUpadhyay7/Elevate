const Blog = require("../models/blog.model");

exports.createBlog = async (req, res) => {
  const { postTitle, postPic, postContent } = req.body;
  try {
    const blog = new Blog({
      postTitle,
      postPic,
      postContent,
      coachId: req.coach.id,
    });
    await blog.save();
    res.status(201).json({ data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error creating blog" });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("coachId", "fullname rank profilePic");
    res.json({ data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching blogs" });
  }
};
