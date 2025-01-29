const Message = require("../models/message.model");

exports.getMessages = async (req, res) => {
  try {

    console.log(`Received request for messages in room: ${req.params.roomId}`);

    const messages = await Message.find({ roomId: req.params.roomId }).sort({
      createdAt: 1,
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
