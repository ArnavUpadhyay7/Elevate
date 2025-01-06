const express = require('express');
const router = express.Router();
const coachController = require("../controllers/coach.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/profile", authMiddleware.authCoach, coachController.coachProfile);

router.post("/signup", coachController.coachSignup);

router.post("/login", coachController.coachLogin);

router.post("/logout", authMiddleware.authCoach, coachController.coachLogout);

module.exports = router;