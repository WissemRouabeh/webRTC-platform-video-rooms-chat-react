import React, { useState, useLayoutEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";

import InputLabel from "@material-ui/core/InputLabel";
import "./createroom.css";
import "./api";
import api from "./api";

import { useHistory } from "react-router-dom";
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

function CreateRoom() {
  const classes = useStyles();

  const history = useHistory();
  const [isFree, setFree] = useState(false);
  const [isPublic, setisPublic] = useState(false);
  const [price, setPrice] = useState(0);
  const [Horaire, setHoraire] = useState("2021-04-29T15:32");
  const [urlpic, seturlpic] = useState(
    "https://cdn4.iconfinder.com/data/icons/documents-36/25/add-picture-512.png"
  );
  const [roomName, setRoomName] = useState("");

  const [roomDescription, setroomDescription] = useState("");
  const [error, setError] = useState("");
  async function addRoom() {
    var roomObj;
    var error = false;
    if (!validName(roomName)) {
      error = true;
      setError("Room name is required enter a valid one");
    } else if (!validName(roomDescription)) {
      error = true;
      setError("A description is important enter a valid one");
    } else {
      setError("");
      error = false;
      roomObj = {
        owner: localStorage.getItem("id"),
        bannerUrl: urlpic,
        name: roomName,
        description: roomDescription,
        isFree: !isFree,
        isPublic,
        Horaire,
        price: isPublic ? "0" : price,
      };
    }
    !error &&
      (await api
        .post("room/addroom", roomObj)
        .then((res) => {
          console.log(res);
          history.push("/accueil");
        })
        .catch((err) => {
          setRoomName("");
          setroomDescription("");
          setError("Error occured");
          error = true;
        }));
  }
  function validName(word) {
    if (word.length > 4) {
      return true;
    }
    return false;
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

  return (
    <div className="createroom__container">
      <div className="createroom__bannerpic">
        <img
          src={urlpic}
          alt=""
          onClick={() => {
            const enteredurl = prompt("Put a url for pic");
            /^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/.test(enteredurl) &&
              seturlpic(enteredurl);
          }}
        />
      </div>
      <div className="createroom__form">
        <div className="createroom__name">
          {/* //here */}
          {/* <input type="text" placeholder="Give your room a name" /> */}
          <TextField
            // value={roomName}
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
            required
            id="outlined-required"
            label="Give your room a name"
            defaultValue=""
            variant="outlined"
            // error
            fullWidth
          />
        </div>
        <div className="createroom__description">
          {/* <input
            type="text"
            placeholder="Feel free to write a description such as skills, level or competance needed also the plus it going to add.."
          /> */}
          <TextField
            // value={roomDescription}
            onChange={(e) => {
              setroomDescription(e.target.value);
            }}
            id="outlined-multiline"
            label="Desciription"
            multiline
            rows={4}
            placeholder="Feel free to write a description such as skills, level or competance needed also the plus it going to add.."
            variant="outlined"
            fullWidth={true}
          />
        </div>
        <div className="createroom__visibility">
          <FormControlLabel
            value={true}
            control={
              <Switch
                color="primary"
                onChange={(event) => {
                  setisPublic(event.target.checked);
                }}
              />
            }
            label="Public"
            labelPlacement="start"
          />
        </div>
        {!isPublic && (
          <div className="createroom__Price">
            <FormControlLabel
              value={isFree}
              control={
                <Switch
                  color="primary"
                  onChange={(event) => {
                    setFree(event.target.checked);
                  }}
                />
              }
              label="Payable"
              labelPlacement="start"
            />
            {isFree && (
              <div className="createroom__Price__input">
                <FormControl
                  fullWidth
                  className={classes.margin}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Price
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    value={price}
                    onChange={(event) => {
                      setPrice(event.target.value);
                      // alert(price);
                    }}
                    startAdornment={
                      <InputAdornment position="start">TND</InputAdornment>
                    }
                    labelWidth={60}
                  />
                </FormControl>
              </div>
            )}
          </div>
        )}

        <div className="createroom__horaire">
          <TextField
            id="datetime-local"
            label="Starting date"
            type="datetime-local"
            fullWidth
            defaultValue={getCurrentDate()}
            onChange={(event) => {
              setHoraire(event.target.value);
            }}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="createroom__submit">
          <Button
            onClick={() => {
              addRoom();
            }}
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
          >
            Create room
          </Button>
        </div>
        <small style={{ color: "red", fontSize: "11" }}>{error}</small>
      </div>
    </div>
  );
}

export default CreateRoom;
