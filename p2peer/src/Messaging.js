import React, { useEffect, useRef, useState } from "react";
import "./messaging.css";
import io from "socket.io-client";
function Messaging({ roomID }) {
  const [messages, setMessages] = useState([]);
  const [mp, setMp] = useState();
  const socketRef = useRef();
  const [name, setName] = useState("");

  useEffect(() => {
    socketRef.current = io.connect("/");
    socketRef.current.emit("joinmsg", "msg" + roomID);
    socketRef.current.on("receivemsg", (m) => {
      setMessages((msg) => [...msg, m]);
    });
  }, []);
  function sendmsg() {
    //use object whenever to maintain that messages array is the same for all peers {name,msg} => if(object.name===name ) than me: else object.name:
    setMessages((msg) => [...msg, "me: " + mp]);
    setMp("");
    socketRef.current.emit("sendingmsg", name + ": " + mp);
  }
  return (
    <div>
      <div className="containermsg">
        <input
          type="text"
          className="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <div className="box">
          {messages.map((m, key) => {
            return <p key={key}>{m}</p>;
          })}
        </div>
        <div className="msging">
          <input
            type="text"
            onChange={(e) => setMp(e.target.value)}
            className="msg"
            value={mp}
          />
          <button onClick={sendmsg}>send</button>
        </div>
      </div>
    </div>
  );
}

export default Messaging;
