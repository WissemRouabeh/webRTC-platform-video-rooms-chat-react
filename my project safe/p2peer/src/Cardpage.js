import React, { useState, useLayoutEffect } from "react";
import "./cardpage.css";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import InputLabel from "@material-ui/core/InputLabel";
import PublicIcon from "@material-ui/icons/Public";
import VpnLockIcon from "@material-ui/icons/VpnLock";
import MoneyOffRoundedIcon from "@material-ui/icons/MoneyOffRounded";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import VideocamIcon from "@material-ui/icons/Videocam";
import { useHistory, useLocation } from "react-router-dom";
import api from "./api";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },

    margin: {
      margin: theme.spacing(1),
    },
  },
}));
function Cardpage() {
  const [participants, setparticipants] = useState([]);
  //   const participants = ["wissem"];
  const classes = useStyles();
  const [participant, setparticipant] = useState(false);
  const [usetoAdd, setusetoAdd] = useState("");
  const [payable, setPayable] = useState(true);
  const [ispublic, setisPublic] = useState(false);
  const [showdesc, setshowdesc] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [room, setRoom] = useState({});
  const [owner, setOwner] = useState({});
  const [connected, setConnected] = useState(
    localStorage.getItem("id") !== null
  );

  useLayoutEffect(() => {
    if (location.state == undefined) {
      history.push("/accueil");
    } else {
      setRoom(location.state.room);
      setOwner(location.state.owner);
      setisPublic(room.isPublic);
      setPayable(!room.isFree);
    }
  });

  function handledeleteparticipant(element) {
    const result = participants.filter((word) => word != element);
    setparticipants(result);
    // participants = result;
    // alert(participants);
    // alert("aze");
  }
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var houre = new Date().getHours();
    var min = new Date().getMinutes();
    if (month < 10) month = "0" + String(month);
    if (date < 10) date = "0" + String(date);
    if (houre < 10) date = "0" + String(min);
    if (min < 10) date = "0" + String(houre);
    return year + "-" + month + "-" + date + "T" + houre + ":" + min;
  };
  async function handleInviteParticipant() {
    var list = [];
    participants.map((participant) => {
      var el = {
        to: participant,
        sender: localStorage.getItem("id"),
        time: getCurrentDate(),
      };
      list.push(el);
    });
    await api
      .post("/room/invite/" + room._id, list)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }
  function verifyToAdd(word) {
    api.get("/user/findbyusername/" + word).then((res) => {
      return res.data.find;
    });
  }
  return (
    <div className="cardpage__holder">
      <div className="cardpage__container">
        <div className="cardpage__banner">
          <img src={room.bannerUrl} alt="" />
        </div>
        <div className="cardpage__informations">
          <div className="cardpage__name">{room.name}</div>
          <div className="cardpage__owner">@ {owner.username}</div>

          <div className="cardpage__payable">
            {payable ? <MonetizationOnOutlinedIcon /> : <MoneyOffRoundedIcon />}
            {payable ? room.price : "free"}
          </div>
          <div className="cardpage__public">
            {ispublic ? <PublicIcon /> : <VpnLockIcon />}
            {ispublic ? "public" : "private"}
          </div>
          <div className="cardpage__horaire">--Starting {room.Horaire}</div>

          <div className="cardpage__join">
            <Button
              onClick={() => {
                //   alert(Horaire);
              }}
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<VideocamIcon />}
              onClick={() => {
                handleInviteParticipant();
                history.push({
                  pathname: "/roomi/" + room._id,
                  state: { prepared: true, room, owner },
                });
              }}
            >
              Join room
            </Button>
          </div>
          {connected && (
            <div
              className="cardpage__divider"
              style={{
                width: "90%",
                backgroundColor: "grey",
                marginTop: "60px",
                height: "1px",
              }}
            ></div>
          )}
          {connected && (
            <div className="cardpage__invite">
              <FormControlLabel
                value={participant}
                control={
                  <Switch
                    color="primary"
                    onChange={(event) => {
                      setparticipant(event.target.checked);
                      // alert(participant);
                    }}
                  />
                }
                label="Invite participant"
                labelPlacement="start"
              />
            </div>
          )}
          {participant && (
            <div className="cardpage__participants">
              <div className="cardpage__addparticipant">
                {/* <input type="text" style={{ width: "100px" }} />{" "} */}
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Username
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={usetoAdd}
                    onChange={(e) => setusetoAdd(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">@</InputAdornment>
                    }
                    labelWidth={60}
                  />
                </FormControl>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    console.log(usetoAdd);
                    participants.push(usetoAdd);
                    setusetoAdd("");
                  }}
                >
                  add
                </Button>
              </div>
              <div className="cardpage__listparticipants">
                {participants.map((element, key) => {
                  return (
                    <div
                      className="cardpage__participant"
                      key={key}
                      onClick={() => handledeleteparticipant(element)}
                    >
                      <small style={{ marginRight: "5px" }}>{element}</small>
                      <div className="cardpage__deleteparticiant">
                        <DeleteIcon />
                      </div>
                    </div>
                  );
                })}
                {/* <div className="cardpage__participant">
                  <small style={{ marginRight: "5px" }}>azeazeaze</small>{" "}
                  <div className="cardpage__deleteparticiant">
                    <DeleteIcon />
                  </div>
                </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="cardpage__buttondescription">
        <Button variant="contained" onClick={() => setshowdesc(!showdesc)}>
          Description
        </Button>
      </div>
      {showdesc && (
        <div className="cardpage__description">{room.description}</div>
      )}
    </div>
  );
}

export default Cardpage;
