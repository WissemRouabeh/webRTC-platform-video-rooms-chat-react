const mongoose = require("mongoose");
const conversationSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  type: String,
  messages: [
    {
      message: String,
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      to: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
      time: String,
    },
  ],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model(
  "Roomconversation",
  conversationSchema,
  "Conversation"
);
