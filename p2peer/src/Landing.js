import React, { useState } from "react";
import "./landing.css";
import { useLocation, useHistory } from "react-router-dom";
import api from "./api";
function Landing() {
  const [contected, setContected] = useState(false);
  const [user, setUser] = useState("Wissem Rouabeh");
  const [link, setLink] = useState("");
  // const [roomid, setRoomid] = useState();
  var roomid;
  const location = useLocation();
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [owner, setOwner] = useState({});
  const [room, setRoom] = useState({});
  const [error, setError] = useState({
    color: "black",
    message: "",
  });
  async function goToRoom() {
    await api
      .get("/room/findbyid/" + roomid)
      .then((doc) => {
        if (doc.data.find) {
          if (doc.data.room.isPublic) {
            setError({ color: "green", message: "Ready to join" });
            setRoom(doc.data.room);
            setOwner(doc.data.room.owner);
            setDisabled(false);
          } else {
            setError({ color: "black", message: "Register to join" });
            // setDisabled(true);
          }
        }
      })
      .catch((err) => {
        setError({ color: "red", message: "Invalid room" });
        // setDisabled(true);
      });
  }
  function clickAction() {
    if (localStorage.getItem("id") == null) {
      localStorage.setItem("username", "unregistred");
      localStorage.setItem("id", "unregistred123456aze7e4s");
    }
    history.push({
      pathname: "/preparing",

      state: { room, owner },
    });
  }
  function handleChange(e) {
    if (e.target.value.split("/").includes("roomi"))
      if (e.target.value.split("/roomi/").pop().length == 24) {
        roomid = e.target.value.split("roomi/").pop();
        goToRoom();
      } else {
        setError({ color: "red", message: "Invalid room" });
        setDisabled(true);
      }
  }
  return (
    <div className="landing__container">
      <div className="landing__navbar">
        {!contected && <button id="landing__btn_signin">Sign in</button>}
        {!contected && <button>Register</button>}
        {!!contected && user}
      </div>
      <div className="landing__center">
        <h7>Why are you waiting?</h7>
        <div className="landing__paste">
          <input
            type="text"
            placeholder="Paste a link to join"
            onChange={handleChange}
          />
        </div>
        <button
          style={{ cursor: disabled ? "no-drop" : "pointer" }}
          disabled={disabled}
          onClick={() => clickAction()}
        >
          Join
        </button>
        <span
          style={{ color: error.color, fontSize: "12px", fontWeight: "600" }}
        >
          {error.message}
        </span>
      </div>
    </div>
  );
}

export default Landing;
