import React from "react";
import "./message.css";
function Message({ msg }) {
  // console.log(msg);
  return (
    <div>
      <div
        className="message__container"
        style={{
          backgroundColor:
            msg.sender === localStorage.getItem("id")
              ? "rgba(12, 93, 170, 0.877)"
              : "rgba(207, 204, 204, 0.596)",
          float: msg.sender === localStorage.getItem("id") ? "right" : "left",
        }}
      >
        <div className="message__body">
          <div
            className="message__txt"
            style={{
              color: msg.sender === localStorage.getItem("id") && "white",
            }}
          >
            {msg.message}
          </div>
          <div className="message__time"> {msg.time}</div>
          <div className="message__sender">
            {msg.usersender === localStorage.getItem("username")
              ? "me"
              : msg.usersender}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
