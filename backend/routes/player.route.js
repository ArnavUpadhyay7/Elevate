const express = require('express');
const router = express.Router();
const playerController = require("../controllers/player.controller");
const authMiddleware = require("../middlewares/auth.middleware");


router.post("/signup", playerController.playerSignup);

router.post("/login", playerController.playerLogin);

router.post("/profile", authMiddleware.authPlayer, playerController.playerProfile);

router.post("/logout", authMiddleware.authPlayer, playerController.playerLogout);

router.get("/check-auth", authMiddleware.authPlayer, playerController.checkAuthPlayer);

module.exports = router;