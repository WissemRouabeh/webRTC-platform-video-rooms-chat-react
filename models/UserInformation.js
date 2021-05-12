const mongoose = require("mongoose");
const userInfoSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  address: String,
  mobile: String,
  bio: String,
  linkedin: String,
  facebook: String,
  github: String,
  website: String,
  title: String,
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("UserInformation", userInfoSchema);
