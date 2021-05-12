const mongoose = require("mongoose");
const conversationSchemaP = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  type: String,
  messages: [
    {
      message: String,
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      time: String,
    },
  ],
});
module.exports = mongoose.model(
  "Personconversation",
  conversationSchemaP,
  "Conversations"
);
