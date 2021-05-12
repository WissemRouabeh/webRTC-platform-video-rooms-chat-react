const express = require("express");

const app = express();
const user = require("./routes/user");
const room = require("./routes/room");

app.use("/user", user);
app.use("/room", room);
module.exports = app;
