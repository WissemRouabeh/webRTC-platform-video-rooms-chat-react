import React from "react";
import "./notification.css";
function Notification({ message, bgColor }) {
  return (
    <div>
      <div
        className="notification_container"
        style={{ backgroundColor: bgColor }}
      >
        <div className="notification_text">{message}</div>
      </div>
    </div>
  );
}

export default Notification;
