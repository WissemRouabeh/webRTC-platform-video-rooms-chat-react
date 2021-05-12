const express = require("express");
const http = require("http");
const { emit } = require("process");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const users = {};
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const Room = require("./models/Room");
const User = require("./models/User");
const PORT = process.env.PORT || 8003;

const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

io.on("connection", (socket) => {
  socket.on("joinroom", (payload) => {
    console.log(payload);

    socket.join(payload.roomID);

    socket
      .to(payload.roomID)
      .broadcast.emit("userconnected", { id: payload.id, name: payload.sname });
    socket.on("disconnect", () => {
      socket.to(payload.roomID).broadcast.emit("userdisconnected", payload.id);
    });

    // socket
    //   .to(payload.roomID)
    //   .broadcast.emit("calling", (payload.id, payload.sname));
  });

  socket.on("joinmsg", (roomid) => {
    socket.join(roomid);
    console.log("ahla fi " + roomid + " where ur id " + socket.id);
    socket.on("sendingmsg", (msg) => {
      User.findById(msg.sender, function (err, docs) {
        if (err) {
          socket.to(roomid).broadcast.emit("receivemsg", msg);
          console.log(msg);
        } else {
          msg.sender = docs;
          socket.to(roomid).broadcast.emit("receivemsg", msg);
          console.log(msg);
        }
      });
    });
  });

  socket.on("joinothers", (payload) => {
    socket.join(payload.roomid);
    if (io.sockets.adapter.rooms.get(payload.roomid) != undefined)
      Room.findOneAndUpdate({ _id: payload.roomid }, { isLive: true })
        .then((res) => console.log("ok"))
        .catch((err) => console.log(err));

    socket.to(payload.roomid).broadcast.emit("newuser", {
      id: payload.id,
      username: payload.username,
    });
    socket.on("disconnect", () => {
      socket.to(payload.roomid).broadcast.emit("userdisconnected", payload.id);
      console.log("t9as---" + payload.id);

      if (io.sockets.adapter.rooms.get(payload.roomid) == undefined)
        Room.findOneAndUpdate({ _id: payload.roomid }, { isLive: false })
          .then((res) => console.log("ok"))
          .catch((err) => console.log(err));
    });
  });
});
//db side
mongoose.connect(
  "mongodb+srv://wissem:wissem@cluster0.08gfo.mongodb.net/joinus?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log("connected")
);

mongoose.set("useFindAndModify", false);
const route = require("./route");
app.use("/", route);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("p2peer/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "p2peer", "build", "index.html"));
  });
}

server.listen(PORT, () => console.log("server is running on port " + PORT));
