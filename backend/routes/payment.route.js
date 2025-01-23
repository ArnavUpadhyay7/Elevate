const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/create', authMiddleware.authPlayer, paymentController.payment);

router.post('/webhook', paymentController.webhook);

module.exports = router;