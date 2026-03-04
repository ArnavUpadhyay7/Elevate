const reviewModel  = require("../models/review.model");
const cloudinary   = require("../config/cloudinary");
const streamifier  = require("streamifier");

exports.getPlayerReviews = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({ player: req.player._id })
      .populate("coach", "fullname profilePic rank role");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCoachReviews = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({ coach: req.coach._id })
      .populate("player", "fullname profilePic rank role");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadVideoToCloud = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file provided" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "elevate/vod-reviews",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    res.status(200).json({ url: result.secure_url });

  } catch (err) {
    console.error("VOD upload error:", err);
    res.status(500).json({ message: "Video upload failed" });
  }
};

exports.uploadVods = async (req, res) => {
  try {
    const { reviewId, vods } = req.body;

    const review = await reviewModel.findById(reviewId);
    if (!review)
      return res.status(404).json({ message: "Review not found" });

    if (review.player.toString() !== req.player._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    if (!Array.isArray(vods) || vods.length === 0)
      return res.status(400).json({ message: "You must upload at least 1 video" });

    if (vods.length > 3)
      return res.status(400).json({ message: "Video limit exceeded" });

    if (review.status !== "awaiting_upload")
      return res.status(400).json({ message: "VODs already submitted!" });

    review.vods = vods.map((url) => ({ url, uploadedAt: new Date() }));
    review.status = "under_review";
    await review.save();

    res.status(200).json({ message: "VODs uploaded successfully", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.completeReview = async (req, res) => {
  try {
    const { reviewId, coachNotes, skillRatings } = req.body;

    const review = await reviewModel.findById(reviewId);
    if (!review)
      return res.status(404).json({ message: "Review not found" });

    if (review.coach.toString() !== req.coach._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    review.coachNotes   = coachNotes;
    review.skillRatings = skillRatings;
    review.status       = "completed";
    await review.save();

    res.status(200).json({ message: "Review completed successfully", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};