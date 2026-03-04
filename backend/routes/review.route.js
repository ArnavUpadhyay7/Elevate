const express        = require("express");
const router         = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const reviewController = require("../controllers/review.controller");
const upload         = require("../middlewares/upload");

// ── Player routes ──
router.get("/player", authMiddleware.authPlayer, reviewController.getPlayerReviews);
router.post("/upload", authMiddleware.authPlayer, reviewController.uploadVods);
router.post("/upload-video", authMiddleware.authPlayer, upload.single("video"), reviewController.uploadVideoToCloud);

// ── Coach routes ──
router.get("/coach", authMiddleware.authCoach, reviewController.getCoachReviews);
router.put("/complete", authMiddleware.authCoach, reviewController.completeReview);

module.exports = router;
