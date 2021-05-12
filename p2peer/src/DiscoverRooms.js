import React, { useState } from "react";
import "./discoverrooms.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import All from "./tabs/All";
import Paid from "./tabs/Paid";
import Free from "./tabs/Free";
import Live from "./tabs/Live";
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});
function DiscoverRooms() {
  const classes = useStyles();
  const [tabNumber, settabNumber] = useState(0);
  const [selecetd, setSelecetd] = useState("all");
  const handleChange = (event, newValue) => {
    settabNumber(newValue);
    switch (newValue) {
      case 0:
        setSelecetd("all");
        break;
      case 1:
        setSelecetd("live");
        break;
      case 2:
        setSelecetd("free");
        break;
      case 3:
        setSelecetd("paid");
      default:
        break;
    }
  };
  function changebody() {
    switch (selecetd) {
      case "all":
        return <All />;
      case "live":
        return <Live />;
      case "paid":
        return <Paid />;
      case "free":
        return <Free />;

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
          width: "100%",
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
            <Tab label="All" />
            <Tab label="Live now" />
            <Tab label="Free" />
            <Tab label="Paid" />
          </Tabs>
        </Paper>
        <div />
      </div>
      {changebody()}
    </div>
  );
}

export default DiscoverRooms;
