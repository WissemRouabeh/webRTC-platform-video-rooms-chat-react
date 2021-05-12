const mongoose = require("mongoose");
const roomSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bannerUrl: String,
  name: String,
  description: String,
  price: String,
  isFree: Boolean,
  isPublic: Boolean,
  Horaire: String,
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // invites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  invites: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      time: String,
    },
  ],
  isLive: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Room", roomSchema);
