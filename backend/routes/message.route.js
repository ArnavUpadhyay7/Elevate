const express = require('express');
const messageController = require('../controllers/message.controller');
const router = express.Router();

router.get("/:roomId", messageController.getMessages);

module.exports = router;