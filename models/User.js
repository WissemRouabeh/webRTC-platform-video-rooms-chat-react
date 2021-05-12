const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  email: String,
  password: String,
  fullname: String,
  balance: { type: String, default: "0" },
  profilePic: String,
  security_question: String,
  joinedAt: { type: Date, default: Date.now() },
  userinformation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserInformation",
  },
});
module.exports = mongoose.model("User", userSchema);
