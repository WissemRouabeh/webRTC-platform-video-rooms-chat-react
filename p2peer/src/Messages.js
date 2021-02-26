import React from "react";
import "./messages.css";
import MessageCard from "./MessageCard.js";
import Messenger from "./Messenger";

function Messages() {
  return (
    <div>
      <div className="messages__container">
        <div className="messages__sidebar">
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
          <MessageCard />
        </div>
        <div className="messages__messages">
          <Messenger />
        </div>
      </div>
    </div>
  );
}

export default Messages;
