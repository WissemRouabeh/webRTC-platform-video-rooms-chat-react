import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import io from "socket.io-client";
import "./roomi.css";
import Peer from "peerjs";
// import { makeStyles } from "@material-ui/core/styles";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import Button from "@material-ui/core/Button";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicIcon from "@material-ui/icons/Mic";
import VideocamIcon from "@material-ui/icons/Videocam";
import MicOffIcon from "@material-ui/icons/MicOff";
import api from "./api";
import { useLocation, useHistory } from "react-router-dom";
import Messaging from "./Messaging";

// const useStyles = makeStyles((theme) => ({
//   button: {
//     margin: theme.spacing(1),
//   },
// }));
function Roomi(props) {
  // const classes = useStyles();
  const myVideo = document.createElement("video");
  const socketRef = useRef();
  const peerList = [];
  const peers = {};
  const uservideo = useRef();
  const myStream = useRef([]);
  const myStreamList = [];
  const mycurrentStream = useRef();
  const roomID = props.match.params.roomID;
  const [room, setRoom] = useState({});
  // const [owner, setOwner] = useState({});
  const owner = useRef({});
  // const mypeer = new Peer(undefined, {
  //   path: "/",
  //   port: 9000,
  //   secure: true,
  // });
  var close = false;
  var mic = false;
  var video = true;
  const username = localStorage.getItem("username");
  const location = useLocation();
  const history = useHistory();
  const [ok, setOk] = useState(false);
  const mypeer = new Peer(localStorage.getItem("username"), {
    // host: "wissemrouabehplatform2.herokuapp.com",
    // port: "443",

    port: 443,
    path: "/",
    secure: true,
  });

  myVideo.muted = true;
  useLayoutEffect(() => {
    if (location.state == undefined) {
      history.push("/accueil");
      close = true;
    } else {
      setRoom(location.state.room);
      // setOwner(location.state.owner);
      owner.current = location.state.owner;
    }
    console.log(
      localStorage.getItem("username") + "__" + owner.current.username
    );

    console.log(localStorage.getItem("id") + "__" + owner.current._id);
  });

  useEffect(() => {
    async function setlive(bool) {
      if (location.pathname.includes(roomID)) {
        await api
          .post("/room/islive/" + roomID, { isLive: bool })
          .then((res) => console.log(res));
      }
    }
    setlive(true);

    window.addEventListener("beforeunload", (ev) => {
      //to prevent user from joing to rooms at same time
      localStorage.setItem("live", false);
      setlive(false);
    });
    return () => {
      if (history.action === "POP") {
        // history.push("/accueil");
        window.open("/accueil", "_self").focus();
      }
    };
  }, []);

  useEffect(() => {
    socketRef.current = io.connect("/");
    !close &&
      navigator.mediaDevices
        .getUserMedia({
          video: { torch: true },
          audio: { echoCancellation: true, noiseSuppression: true },
        })
        .then((stream) => {
          // addVideoStreamOwner(myVideo, stream);
          myStream.current = stream;

          console.log(myStream.current);
          mycurrentStream.current = stream;
          localStorage.setItem("live", true);
          // console.log(owner);
          if (owner.current._id === localStorage.getItem("id")) {
            mycurrentStream.current.getAudioTracks()[0].enabled = true;
            uservideo.current.muted = true;
            addVideoStreamOwner(stream);
          } else {
            const video = document.createElement("video");
            mycurrentStream.current.getAudioTracks()[0].enabled = false;
            video.muted = true;
            addVideoStream(video, stream, username);
          }

          mypeer.on("call", (call) => {
            call.answer(stream);
            const video = document.createElement("video");

            call.on("stream", (partnerstream) => {
              //check for owner room to put his stream in the right place
              console.log("pper" + call.peer);
              if (call.peer === owner.current.username) {
                addVideoStreamOwner(partnerstream);
                // const peersarray = myStream.current;
                // peersarray.push(call.peerConnection);
                myStream.current = call.peerConnection;
                myStreamList.push(call.peerConnection);
                console.log(myStreamList.length);
              } else addVideoStream(video, partnerstream, call.peer);
              peerList.push(call.peer);
            });
          });

          socketRef.current.on("newuser", (payload) => {
            connectToNewUser(payload.id, payload.username, stream);
          });

          socketRef.current.on("userdisconnected", (userId) => {
            console.log(userId);
            if (peers[userId]) peers[userId].close();

            if (userId === owner.current.username)
              uservideo.current.srcObject = null;
            else {
              var element = document.getElementById(userId);

              // element.srcObject = null;
              if (element) element.remove();
            }
          });
        });

    mypeer.on("open", (id) => {
      // alert(id);
      socketRef.current.emit("joinothers", {
        roomid: roomID,
        id,
        username: localStorage.getItem("username"),
      });
    });

    setOk(true);
  }, []);
  function connectToNewUser(userId, us, stream) {
    // alert(us);
    const call = mypeer.call(userId, stream);
    const video = document.createElement("video");
    video.setAttribute("id", userId);
    call.on("stream", (userVideoStream) => {
      myStream.current = call.peerConnection;
      myStreamList.push(call.peerConnection);
      console.log(myStreamList.length);

      if (userId === owner.current.username) {
        addVideoStreamOwner(userVideoStream);
      } else addVideoStream(video, userVideoStream, userId);
    });

    call.on("close", () => {
      video.remove();
    });

    peers[userId] = call;
  }
  function addVideoStream(video, stream, id) {
    const Participantsvideo = document.getElementById("roomi_participants");
    video.setAttribute("id", id);
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
    Participantsvideo.append(video);
  }

  function addVideoStreamOwner(stream) {
    // const Ownervideo = document.getElementById("roomi_owner");

    // video.srcObject = stream;
    // video.addEventListener("loadedmetadata", () => {
    //   video.play();
    // });
    // Ownervideo.append(video);
    uservideo.current.srcObject = stream;
    uservideo.current.addEventListener("loadedmetadata", () => {
      uservideo.current.play();
    });
  }
  function sharemyscrean() {
    navigator.mediaDevices
      .getDisplayMedia({
        video: { cursor: "always" },
        audio: true,
      })
      .then((stream) => {
        let videotrack = stream.getVideoTracks()[0];

        uservideo.current.srcObject = stream;
        videotrack.onended = () => {
          stopsharescreen();
        };

        try {
          myStreamList.forEach((element) => {
            let sender = element
              .getSenders()
              .find((e) => e.track.kind == videotrack.kind);

            sender.replaceTrack(videotrack);
          });
        } catch (error) {
          console.log("No user in room to share with your screen");
        }
      });

    function stopsharescreen() {
      let videotrack = mycurrentStream.current.getVideoTracks()[0];
      uservideo.current.srcObject = mycurrentStream.current;
      try {
        myStreamList.forEach((element) => {
          let sender = element
            .getSenders()
            .find((e) => e.track.kind == videotrack.kind);

          sender.replaceTrack(videotrack);
        });
      } catch (error) {
        console.log("No user in room to share with your screen");
      }
    }
  }
  function webcami() {
    mycurrentStream.current.getVideoTracks()[0].enabled = !mycurrentStream.current.getVideoTracks()[0]
      .enabled;
    video = mycurrentStream.current.getVideoTracks()[0].enabled;
  }

  function mici() {
    mycurrentStream.current.getAudioTracks()[0].enabled = !mycurrentStream.current.getAudioTracks()[0]
      .enabled;
  }
  return (
    <div>
      <div className="roomi__container">
        <div className="roomi_streaming">
          <div id="roomi_owner">
            <video ref={uservideo}></video>
            {owner._id === localStorage.getItem("id") && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                className="roomi_sharescreen_btn"
                startIcon={<ScreenShareIcon />}
                onClick={() => {
                  sharemyscrean();
                }}
              >
                Share screen
              </Button>
            )}
            <div className="roomi_optionsCall">
              <VideocamOffIcon
                id="roomi__webcam"
                onClick={() => {
                  webcami();
                }}
              />
              <MicIcon
                id="roomi__mic"
                style={{ color: mic ? "white" : "grey" }}
                onClick={() => {
                  mici();
                }}
              />
            </div>
          </div>
          {/* ----------------------- <br /> */}
          <div id="roomi_participants"></div>
        </div>
        <div className="roomi_messanging">
          <Messaging roomID={roomID} />
        </div>
      </div>
    </div>
  );
}

export default Roomi;
