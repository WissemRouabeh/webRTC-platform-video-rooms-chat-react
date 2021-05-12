import { Avatar } from "@material-ui/core";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";
import Message from "./Message";
import io from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
import "./messenger.css";
import api from "./api";
function Messenger({ currentconversation }) {
  const socketRef = useRef();
  const [messages, setMessages] = useState([]);
  const [mp, setMp] = useState();

  var receiver;
  useEffect(() => {
    api
      .post("/room/findconversation/" + currentconversation.conversation._id, {
        type: currentconversation.type,
      })
      .then((docs) => {
        setMessages(docs.data.messages);
        // var receiver;
        // if (messages[0].to != undefined)
        // if (messages[0].to._id === localStorage.getItem("id"))
        //   receiver = messages[0].sender;
        // else receiver = messages[0].to;
        // console.log(messages[0].sender);
      });
  }, [currentconversation]);
  useEffect(() => {
    socketRef.current = io.connect("/");
    socketRef.current.emit(
      "joinmsg",
      "msg" + currentconversation.conversation._id
    );
    socketRef.current.on("receivemsg", (m) => {
      setMessages((msg) => [...msg, m]);
      document
        .getElementsByClassName("messenger_focus_on_last")
        [messages.length].scrollIntoView();
    });
  }, []);
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
  async function sendmsg() {
    //use object whenever to maintain that messages array is the same for all peers {name,msg} => if(object.name===name ) than me: else object.name:

    var message = {
      message: mp,
      sender: localStorage.getItem("id"),
      to: currentconversation.receiver,
      type: "person",
      time: getCurrentDate(),
    };
    await api
      .post(
        "/room/pushmessage/" + currentconversation.conversation._id,
        message
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    setMp("");
    message.usersender = localStorage.getItem("username");
    socketRef.current.emit("sendingmsg", message);
    setMessages((msg) => [...msg, message]);
    document
      .getElementsByClassName("messenger_focus_on_last")
      [messages.length].scrollIntoView();
  }
  return (
    <div>
      <div className="messenger__container">
        <div className="messenger__header">
          <Avatar />
          <div className="messenger__header__name">
            {currentconversation.person}
          </div>
          <div className="messenger__make_room">
            Make
            <MeetingRoomIcon />
          </div>
        </div>
        <div className="messenger__messages">
          {messages.map((msg) => {
            return (
              <div className="messenger_focus_on_last">
                <Message msg={msg} />
              </div>
            );
          })}
          {/* <div className="messenger_focus_on_last"></div>qsd */}
        </div>
        <div className="messenger__footer">
          <input
            type="text"
            placeholder="say something don't be shy"
            onChange={(e) => setMp(e.target.value)}
            value={mp}
          />
          {/* <button>Send !</button> */}
          {/* <Button
            className="messenger__footer__button"
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
          >
            Send
          </Button> */}
          <SendIcon
            className="messenger__footer__button"
            onClick={() => {
              sendmsg();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Messenger;
