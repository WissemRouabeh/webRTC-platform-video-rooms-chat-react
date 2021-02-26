const express = require("express");
const http = require("http");
const { emit } = require("process");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const users = {};
const PORT = process.env.PORT || 8003;

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
      console.log(msg);
      socket.to(roomid).broadcast.emit("receivemsg", msg);
    });
  });

  socket.on("joinothers", (payload) => {
    socket.join(payload.roomid);
    socket.to(payload.roomid).broadcast.emit("newuser", payload.id);
  });
});
const rout = require("./route");
app.use("/", rout);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("p2peer/build"));
}

server.listen(8003, () => console.log("server is running on port " + PORT));
