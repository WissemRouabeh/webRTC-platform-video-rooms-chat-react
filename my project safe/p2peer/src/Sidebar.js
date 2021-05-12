import React from "react";
import "./sidebar.css";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AddBoxIcon from "@material-ui/icons/AddBox";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
function Sidebar() {
  return (
    <div className="sidebar__container">
      <div className="sidebar__card">
        {" "}
        <AccountBoxIcon />
        My profile
      </div>
      <div className="sidebar__card">
        {" "}
        <AddBoxIcon /> Create new room
      </div>
      <div className="sidebar__card">
        {" "}
        <MeetingRoomIcon /> Discover
      </div>
      <div className="sidebar__card">
        {" "}
        <MeetingRoomIcon />
        My rooms
      </div>
      <div className="sidebar__card">
        {" "}
        <SettingsApplicationsIcon /> Settings
      </div>
      <div className="sidebar__card">
        {" "}
        <ExitToAppIcon /> Log out
      </div>
    </div>
  );
}

export default Sidebar;
