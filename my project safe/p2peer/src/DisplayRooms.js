import React, { useState } from "react";
import "./displayrooms.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Mine from "./tabs/Mine";
import FavoritesRooms from "./tabs/FavoritesRooms";
import Invites from "./tabs/Invites";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
function DisplayRooms() {
  const classes = useStyles();
  const [tabNumber, settabNumber] = useState(0);

  const [selecetd, setSelecetd] = useState("mine");

  const handleChange = (event, newValue) => {
    settabNumber(newValue);
    switch (newValue) {
      case 0:
        setSelecetd("mine");
        break;
      case 1:
        setSelecetd("invites");
        break;
      case 2:
        setSelecetd("favorite");
      default:
        break;
    }
  };
  function changebody() {
    switch (selecetd) {
      case "mine":
        return <Mine />;

      case "favorite":
        return <FavoritesRooms Fav={true} />;
      case "invites":
        return <Invites />;

      default:
        break;
    }
  }
  return (
    <div className="displayrooms__container">
      <div
        className="displayrooms__tabs"
        style={{
          marginBottom: "20px",
          // width: "100%",
        }}
      >
        <Paper id="tabs" className={classes.root} s>
          <Tabs
            value={tabNumber}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="My rooms" />
            <Tab label="Invited to" />
            <Tab label="Favorites" />)
          </Tabs>
        </Paper>
        <div />
      </div>
      {changebody()}
    </div>
  );
}

export default DisplayRooms;
