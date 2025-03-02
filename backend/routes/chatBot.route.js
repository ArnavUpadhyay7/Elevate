const express = require('express');
const router = express.Router();
const chatBotController = require('../controllers/chatBot.controller');

router.post("/ask", chatBotController.ask);

module.exports = router;