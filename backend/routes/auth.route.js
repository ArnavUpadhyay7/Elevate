const express = require("express");
const jwt = require("jsonwebtoken");
const playerModel = require("../models/player.model");
const coachModel = require("../models/coach.model");

const router = express.Router();

router.get("/session", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ role: null, user: null });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const player = await playerModel
      .findById(decoded.id)
      .populate("payed_coach", "fullname profilePic rank role");

    if (player) {
      return res.status(200).json({ role: "player", player });
    }

    const coach = await coachModel.findById(decoded.id);
    if (coach) {
      return res.status(200).json({ role: "coach", coach });
    }

    return res.status(404).json({ role: null, user: null });
  } catch {
    return res.status(401).json({ role: null, user: null });
  }
});

module.exports = router;
