import { Avatar } from "@material-ui/core";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import SendIcon from "@material-ui/icons/Send";
import Button from "@material-ui/core/Button";

import React from "react";
import "./messenger.css";
function Messenger() {
  return (
    <div>
      <div className="messenger__container">
        <div className="messenger__header">
          <Avatar />
          <div className="messenger__header__name">Wissem Rouabeh</div>
          <div className="messenger__make_room">
            Make
            <MeetingRoomIcon />
          </div>
        </div>
        <div className="messenger__messages">
          q<div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
          <div className="messenger_focus_on_last"></div>q
        </div>
        <div className="messenger__footer">
          <input type="text" />
          {/* <button>Send !</button> */}
          {/* <Button
            className="messenger__footer__button"
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
          >
            Send
          </Button> */}
          <SendIcon className="messenger__footer__button" />
        </div>
      </div>
    </div>
  );
}

export default Messenger;
