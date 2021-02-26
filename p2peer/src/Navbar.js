import React, { useState } from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from "@material-ui/icons/Chat";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import MiniLogin from "./MiniLogin.js";
import "./navbar.css";
function Navbar({ SetChangepage }) {
  const [showminilogin, setShowminilogin] = useState(false);
  const [showcoin, setShowcoin] = useState(false);
  const [logged, setLogged] = useState(true);

  return (
    <div>
      <div className="navbar__container">
        <div className="navbar__left">
          <img
            src="https://png.pngtree.com/element_our/png/20181011/linkedin-social-media-icon-design-template-vector-png_127000.jpg"
            alt="icon"
            style={{ width: "50px", height: "50px", objectFit: "fill" }}
          />
          <div className="navbar__search">
            <SearchIcon />
            <input type="text" placeHolder="search" />
          </div>
        </div>
        <div
          className="navbar__right"
          onMouseLeave={() => {
            !logged && setShowminilogin(false);
            logged && setShowcoin(false);
          }}
        >
          <div className="navbar__tabs">
            <div className="nav__tab" onClick={() => SetChangepage("home")}>
              <HomeIcon />
              <div>Home</div>
            </div>
            <div className="nav__tab" onClick={() => SetChangepage("rooms")}>
              <MeetingRoomIcon />
              <div>Rooms</div>
            </div>
            <div className="nav__tab" onClick={() => SetChangepage("messages")}>
              <ChatIcon />
              <div>Messages</div>
            </div>
            <div className="nav__tab" onClick={() => SetChangepage("schedule")}>
              <TimelapseIcon />
              <div>Schedule</div>
            </div>
          </div>
          <div className="navbar__divider"></div>
          <div
            className="navbar__myaccount"
            onMouseEnter={() => {
              !logged && setShowminilogin(true);
              logged && setShowcoin(true);
            }}
          >
            {logged ? "Wissem Rouabeh" : "Sign in"}
            <AccountBoxIcon />
            <MiniLogin show={showminilogin} />
            <div
              className="navbar__coins"
              style={{ display: showcoin ? "block" : "none" }}
            >
              150
              <MonetizationOnIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
