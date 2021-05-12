import React, { useState, useRef } from "react";
import api from "./api";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import "./popupmessage.css";
function Popupmessage({ profileid, username }) {
  const [mp, setMp] = useState("");
  const [room, setRoom] = useState();
  let placeholder = "Write something to " + username;
  //   const room = useRef();
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var houre = new Date().getHours();
    var min = new Date().getMinutes();
    if (month < 10) month = "0" + String(month);
    if (date < 10) date = "0" + String(date);
    if (houre < 10) date = "0" + String(min);
    if (min < 10) date = "0" + String(houre);
    return year + "-" + month + "-" + date + "T" + houre + ":" + min;
  };
  async function checkExistConversation() {
    await api
      .post("/room/existconversation", {
        sender: localStorage.getItem("id"),
        to: profileid,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.find) {
          push(res.data.id);
        } else {
          createRoom();
        }
      });
  }
  async function createRoom() {
    await api
      .post("/room/addconversation", { type: "person" })
      .then((res) => {
        console.log("create room and push");
        console.log(res);
        push(res.data._id);
        setRoom(res.data._id);
      })
      .catch((err) => console.log(err));
  }
  async function push(id) {
    var message = {
      message: mp,
      sender: localStorage.getItem("id"),
      to: profileid,
      type: "person",
      time: getCurrentDate(),
    };
    await api
      .post("/room/pushmessage/" + id, message)
      .then((res) => {
        console.log(res);
        console.log("push");
      })
      .catch((err) => console.log(err));
  }
  function sendAction() {
    checkExistConversation();
  }
  return (
    <div>
      <div className="popupmessage__container">
        <div className="popupmessage__body">
          {/* <input
            placeholder="Write something to "
            type="text"
            onChange={(e) => setMp(e.target.value)}
          /> */}
          <textarea
            type="text"
            placeholder={placeholder}
            onChange={(e) => setMp(e.target.value)}
            cols="50"
            rows="3"
          ></textarea>

          <Button
            onClick={() => {
              sendAction();
            }}
            variant="contained"
            size="small"
            color="primary"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Popupmessage;
