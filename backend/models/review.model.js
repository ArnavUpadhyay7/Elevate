const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "player",
    required: true,
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "coach",
    required: true,
  },
  status: {
    type: String,
    enum: ["awaiting_upload", "under_review", "completed"],
    default: "awaiting_upload",
  },
  vods: [
    {
      url: String,
      uploadedAt: Date,
    }
  ],
  coachNotes: {
    strengths: String,
    improvements: String,
    drills: String,
  },
  skillRatings: {
    aim: Number,
    positioning: Number,
    decisionMaking: Number,
    utilityUsage: Number,
    communication: Number,
  }
}, { timestamps: true });

const reviewModel = mongoose.model('review', reviewSchema);

module.exports = reviewModel;