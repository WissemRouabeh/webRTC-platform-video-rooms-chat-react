import React, { useEffect, useRef, useState } from "react";
import "./messaging.css";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";

import io from "socket.io-client";
import api from "./api";
import Message from "./Message";
function Messaging({ roomID }) {
  const [messages, setMessages] = useState([]);
  const [mp, setMp] = useState();
  const socketRef = useRef();
  const [name, setName] = useState("");

  async function createRoom() {
    await api
      .post("/room/addconversation", { type: "group", id: roomID })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    api
      .post("/room/findconversation/" + roomID, { type: "group" })
      .then((docs) => {
        setMessages(docs.data.messages);
        //   document
        //     .getElementsByClassName("messenger_focus_on_last")
        //     [messages.length].scrollIntoView();
      });
  }, []);

  useEffect(() => {
    socketRef.current = io.connect("/");
    socketRef.current.emit("joinmsg", "msg" + roomID);
    socketRef.current.on("receivemsg", (m) => {
      // if (messages.length == 0) {
      //   var arr = messages;
      //   arr.push(m);
      //   setMessages(arr);
      // } else {
      //   setMessages((msg) => [...msg, m]);
      // }
      if (!m.first) setMessages((msg) => [...msg, m]);
      else {
        // var arr = messages;
        // arr.push(m);
        // setMessages(arr);
        setMessages([m]);
      }
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
    // if (messages === undefined || messages.length < 1) {
    //   createRoom();
    // }

    var message = {
      message: mp,
      sender: localStorage.getItem("id"),
      to: roomID,
      type: "group",
      time: getCurrentDate(),
    };
    if (messages?.length > 0) {
      message.first = false;
    } else {
      message.first = true;
      createRoom();
    }
    await api
      .post("/room/pushmessage/" + roomID, message)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
    setMp("");
    message.usersender = localStorage.getItem("username");
    socketRef.current.emit("sendingmsg", message);
    if (messages?.length > 0) setMessages((msg) => [...msg, message]);
    else {
      // var arr = messages;
      // arr.push(message);
      setMessages([message]);
    }
    // if (messages === undefined) setMessages([message]);
    // else setMessages((msg) => [...msg, message]);
    // if (messages.length == 0) {
    //   var arr = messages;

    //   arr.push(message);
    //   setMessages(arr);
    // } else {
    //   setMessages((msg) => [...msg, message]);
    // }
    if (messages != undefined)
      document
        .getElementsByClassName("messenger_focus_on_last")
        [messages?.length].scrollIntoView();
  }
  return (
    <div>
      <div className="messaging__container">
        {/* <input
          type="text"
          className="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        /> */}
        <div className="messaging__box">
          {/* {messages !== undefined &&
            messages.map((m, key) => {
              return (
                <p key={key}>
                  {m.sender.username}"|"{m.message}
                </p>
              );
            })} */}
          {messages !== undefined &&
            messages.map((msg) => {
              return (
                <div className="messenger_focus_on_last">
                  <Message msg={msg} />
                </div>
              );
            })}
        </div>
        <div className="messaging__sendaction">
          <input
            type="text"
            placeholder="say something don't be shy"
            onChange={(e) => setMp(e.target.value)}
            className="msg"
            value={mp}
          />
          <SendIcon
            className="messanging__sendbtn"
            onClick={() => {
              sendmsg();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Messaging;
