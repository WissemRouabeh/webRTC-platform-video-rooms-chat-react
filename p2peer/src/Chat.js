import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "peerjs";
import ReactDOM from "react-dom";
import styled from "styled-components";
import Messaging from "./Messaging.js";

import "./chat.css";

const Chat = (props) => {
  const sname = "wissem";
  const [share, setShare] = useState(false);
  const socketRef = useRef();
  const uservideo = useRef();
  const partnervideo = useRef();
  const [join, setJoin] = useState(false);
  // const [partnerisON, setPartnerisON] = useState(false);
  // const [acall, setAcall] = useState(false);
  const roomID = props.match.params.roomID;
  const [mystream, setMystream] = useState();
  const [myactualstream, setMyactualstream] = useState();
  const peers = {};
  const [type, setType] = useState();
  const mypeer = new Peer(undefined, {
    // secure: "true",
    host: "wissemrouabehplatform.herokuapp.com",
    port: "9000",
  });

  useEffect(() => {
    socketRef.current = io.connect("/");
    join && (uservideo.current.muted = true);
    navigator.mediaDevices
      .getUserMedia({
        video: { torch: true },
        audio: { echoCancellation: true, noiseSuppression: true },
      })
      .then((stream) => {
        setMyactualstream(stream);
        console.log(stream);
        setMystream(stream);
        join && addVideoStream(uservideo.current, stream);

        mypeer.on("call", (call) => {
          call.answer(stream);

          call.on("stream", (partnerstream) => {
            addVideoStream(partnervideo.current, partnerstream);
            setMystream(call.peerConnection);
            setShare(true);
          });
        });

        socketRef.current.on("userconnected", (payload) => {
          connecttonewuser(payload.id, stream);
        });
        socketRef.current.on("userdisconnected", (id) => {
          //alert(id);
          if (peers[id]) peers[id].close();
          partnervideo.current.srcObject = null;
        });
      });

    join &&
      mypeer.on("open", (id) => {
        socketRef.current.emit("joinroom", {
          roomID,
          id,
          sname,
        });
      });
  }, [join]);

  function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
  }
  function whoami(e) {
    setType(e.target.value);
  }
  function connecttonewuser(userid, stream) {
    const call = mypeer.call(userid, stream);

    call.on("stream", (partnerstream) => {
      addVideoStream(partnervideo.current, partnerstream);
      setMystream(call.peerConnection);
      setShare(true);
    });

    call.on("close", () => {
      partnervideo.current.srcObject = null;
    });
    peers[userid] = call;
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
        let sender = mystream
          .getSenders()
          .find((e) => e.track.kind == videotrack.kind);

        sender.replaceTrack(videotrack);
      });

    function stopsharescreen() {
      let videotrack = myactualstream.getVideoTracks()[0];
      uservideo.current.srcObject = myactualstream;
      let sender = mystream
        .getSenders()
        .find((e) => e.track.kind == videotrack.kind);

      sender.replaceTrack(videotrack);
    }
  }
  return (
    <div>
      <div className="container">
        <div className="streaming">
          {join && (
            <video
              className="prof"
              ref={type === "prof" ? uservideo : partnervideo}
            ></video>
          )}
          <video
            className="etud"
            ref={type === "prof" ? partnervideo : uservideo}
          ></video>
        </div>
        <div className="chatting">
          <Messaging roomID={roomID} />
        </div>
      </div>
      {share && (
        <button
          className="share"
          onClick={() => {
            sharemyscrean();
          }}
        >
          sharemyscrean
        </button>
      )}
      <input type="text" onChange={whoami} className="who" />
      {!join && type && (
        <button type="button" onClick={() => setJoin(true)}>
          JOIN
        </button>
      )}
    </div>
  );
};

export default Chat;
