import React from "react";
import "./messagecard.css";
import Avatar from "@material-ui/core/Avatar";

function MessageCard() {
  return (
    <div>
      <div className="message__card">
        <div className="message__card__avatar">
          <Avatar />
        </div>
        <div className="message__card__body">
          <div className="message__name">Wissem Rouabeh </div>
          <div className="message__text">Lorem ipsum dolor sit amet con</div>
        </div>
        <div className="message__card__divider"></div>
      </div>
    </div>
  );
}

export default MessageCard;
