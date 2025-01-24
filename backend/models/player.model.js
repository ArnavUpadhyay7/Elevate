const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: [3, "Full name must have atleast 3 letters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  profilePic: {
    type: String,
  },
  playerBanner: {
    type: String,
  },
  about: {
    type: String,
    required: true
  },
  rank: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  payed_coach:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coach',
  }

}, {timestamps: true});

const playerModel = mongoose.model("player", playerSchema);

module.exports = playerModel;