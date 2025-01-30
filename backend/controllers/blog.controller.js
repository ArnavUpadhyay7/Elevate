const Blog = require("../models/blog.model");
const Player = require("../models/player.model");

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
    const blogs = await Blog.find().populate(
      "coachId",
      "fullname rank profilePic"
    );
    res.json({ data: blogs });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching blogs" });
  }
};

exports.likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const playerId = req.body.playerId;

    if (blog.likes.includes(playerId)) {
      return res.status(400).json({ message: "You have already liked this post" });
    }

    blog.likes.push(playerId)
    blog.like += 1;
    await blog.save();

    res.status(200).json({ like: blog.like });
  } catch (err) {
    res.status(500).json({ message: "Error liking the blog" });
  }
};

exports.addComment = async (req, res) => {
  const { commentText, playerId } = req.body;

  try {
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).send("Player not found");
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const hasCommented = blog.comments.some((comment) => comment.playerId.toString() === playerId);
    if (hasCommented) {
      return res.status(400).json({ message: "You have already commented on this post" });
    }

    const newComment = {
      playerId: player._id,
      playerName: player.fullname,
      playerProfilePic: player.profilePic,
      commentText,
    };

    blog.comments.push(newComment);
    await blog.save();
    res.status(200).json({ comments: blog.comments });
  } catch (err) {
    res.status(500).json({ message: "Error adding comment" });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      console.error("Blog not found with ID:", req.params.id);
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting the blog:", error);
    res.status(500).json({ message: "Error deleting the blog" });
  }
}
