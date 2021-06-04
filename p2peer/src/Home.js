import React, { useState } from "react";
import Sidebar from "./Sidebar.js";
import Myprofile from "./Myprofile.js";
import EditableProfile from "./EditableProfile.js";
import CreateRoom from "./CreateRoom.js";
import DisplayRooms from "./DisplayRooms.js";
import DiscoverRooms from "./DiscoverRooms.js";
import FavoritesRooms from "./tabs/FavoritesRooms.js";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import { useHistory } from "react-router-dom";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AddBoxIcon from "@material-ui/icons/AddBox";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import SettingsApplicationsIcon from "@material-ui/icons/SettingsApplications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./home.css";
import UpdateDelete from "./UpdateDelete.js";

function Home() {
  const [selecetd, setSelecetd] = useState("home");
  const history = useHistory();

  function changeBody() {
    switch (selecetd) {
      case "home":
        return <DiscoverRooms />;
        break;
      case "createroom":
        return <CreateRoom />;
        break;
      case "myprofile":
        return <EditableProfile />;
        break;
        break;
      case "favorite":
        return <FavoritesRooms />;
        break;
      case "myspace":
        return (
          <DisplayRooms Setselected={setSelecetd} ChangeBody={changeBody} />
        );
        break;
      case "manage":
        return <UpdateDelete />;
        break;
      case "discover":
        return <DiscoverRooms />;
        break;
      case "logout":
        {
          localStorage.clear();
          history.push("/login");
        }
        break;

      default:
        break;
    }
  }
  return (
    <div className="home__container">
      <div className="home__sidebar" style={{ position: "fixed", bottom: "0" }}>
        {/* <Sidebar /> */}
        <SideNav
          onSelect={(selected) => {
            // Add your code here
            setSelecetd(selected);
          }}
          style={{
            height: "100%",

            background:
              "linear-gradient(172deg, #344955 0%, rgba(96,125,139,1) 100%)",
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem eventKey="myprofile">
              <NavIcon>
                <AccountBoxIcon />
              </NavIcon>
              <NavText>My profile</NavText>
            </NavItem>
            <NavItem eventKey="createroom">
              <NavIcon>
                <AddBoxIcon />
              </NavIcon>
              <NavText>Create New Room</NavText>
            </NavItem>

            <NavItem eventKey="rooms">
              <NavIcon>
                <MeetingRoomIcon />
              </NavIcon>
              <NavText>Rooms</NavText>
              <NavItem eventKey="discover">
                <NavText>Discover</NavText>
              </NavItem>
              <NavItem eventKey="myspace">
                <NavText>My Space</NavText>
              </NavItem>
              <NavItem eventKey="manage">
                <NavText>Manage</NavText>
              </NavItem>
            </NavItem>

            <NavItem eventKey="settings">
              <NavIcon>
                <SettingsApplicationsIcon />
              </NavIcon>
              <NavText>Settings</NavText>
            </NavItem>

            <NavItem eventKey="logout">
              <NavIcon>
                <ExitToAppIcon />
              </NavIcon>
              <NavText>Log out</NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </div>
      <div className="home__dynamic">
        {/* <Myprofile /> */}
        {/* <CreateRoom /> */}
        {/* <DisplayRooms /> */}
        {changeBody()}
      </div>
    </div>
  );
}

export default Home;
