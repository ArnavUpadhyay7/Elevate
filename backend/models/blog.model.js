const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    coachId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'coach',
      required: true,
    },
    postTitle: {
      type: String,
      required: true,
    },
    postPic: {
      type: String,
    },
    postContent: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player',
        unique: true,
      },
    ],
    comments: [
      {
        playerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'player',
        },
        playerName: {
          type: String,
          required: true,
        },
        playerProfilePic: {
          type: String,
        },
        commentText: {
          type: String,
          required: true,
        }
      },
    ],
  },
  { timestamps: true }
);

const blogModel = mongoose.model('blog', blogSchema);

module.exports = blogModel;