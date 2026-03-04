const jwt         = require("jsonwebtoken");
const playerModel = require("../models/player.model");
const coachModel  = require("../models/coach.model");

module.exports.authPlayer = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Populate payed_coach so the Reviews page can show coach names/pics
    const player = await playerModel
      .findById(decoded.id)
      .populate("payed_coach", "fullname profilePic rank role");

    if (!player) return res.status(404).json({ message: "Player not found" });

    req.player = player;
    return next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports.authCoach = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const coach   = await coachModel.findById(decoded.id);
    if (!coach) return res.status(404).json({ message: "Coach not found" });

    req.coach = coach;
    return next();
  } catch {
    return res.status(401).json({ message: "Unauthorized" });
  }
};