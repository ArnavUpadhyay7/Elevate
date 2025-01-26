const express = require('express');
const router = express.Router();
const coachController = require("../controllers/coach.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/signup", coachController.coachSignup);

router.post("/login", coachController.coachLogin);

router.post("/profile", authMiddleware.authCoach, coachController.coachProfile);

router.post("/logout", authMiddleware.authCoach, coachController.coachLogout);

router.get("/check-auth", authMiddleware.authCoach, coachController.checkAuthCoach);

router.get("/coaches", coachController.getAllCoaches);

router.get("/my-players", authMiddleware.authCoach, coachController.myPlayers);

router.get("/:id", coachController.getCoachById);

module.exports = router;