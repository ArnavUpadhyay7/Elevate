const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema({
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
    default: "https://cdn-icons-png.flaticon.com/128/149/149071.png"
  },
  coachBanner: {
    type: String,
    default: "https://i.pinimg.com/1200x/8a/a6/14/8aa61454976eb18a034fa52f16c1ed70.jpg"
  },
  about: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
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
  payed_player: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'player',
  }]
}, {timestamps: true});

const coachModel = mongoose.model("coach", coachSchema);

module.exports = coachModel;
