import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "peerjs";

function OneToN(props) {
  const uservideo = useRef();
  const socketRef = useRef();
  const roomID = props.match.params.roomID;
  const peerList = [];
  const mypeer = new Peer(undefined, {
    // host: "wissemrouabehplatform2.herokuapp.com",
    // port: "443",

    port: 443,
    path: "/",
    secure: true,
  });

  useEffect(() => {
    socketRef.current = io.connect("/");

    navigator.mediaDevices
      .getUserMedia({
        video: { torch: true },
        audio: { echoCancellation: true, noiseSuppression: true },
      })
      .then((stream) => {
        // if (owner) uservideo.current.srcObject = stream;

        let video = document.createElement("video");
        video.srcObject = stream;
        video.muted = true;
        // video.setAttribute("useRef", { uservideo });

        var element = document.getElementById("users");
        element.appendChild(video);

        video.play();

        mypeer.on("call", (call) => {
          call.answer(stream);
          call.on("stream", (partnerstream) => {
            if (!peerList.includes(call.peer)) {
              let video = document.createElement("video");
              video.srcObject = partnerstream;
              var element = document.getElementById("users");
              element.appendChild(video);
              video.play();
              peerList.push(call.peer);
            }
          });
        });

        socketRef.current.on("newuser", (id) => {
          callnewuser(id, stream);
        });
      });

    mypeer.on("open", (id) => {
      alert(id);
      socketRef.current.emit("joinothers", {
        roomid: roomID,
        id,
      });
    });
  }, []);
  function callnewuser(id, stream) {
    const call = mypeer.call(id, stream);
    call.on("stream", (partnerstream) => {
      if (!peerList.includes(call.peer)) {
        //you can also check if user grabbed from bd is joined(attribute in bd )
        let video = document.createElement("video");
        video.setAttribute("id", id);
        video.srcObject = partnerstream;
        var element = document.getElementById("users");
        element.appendChild(video);
        video.play();
        // video.remove();
      }
    });
    call.on("close", () => {
      alert("closed");
      var element = document.getElementById(id);
      element.remove();
    });
  }
  return (
    <div>
      <div className="container">
        <video src="" ref={uservideo}></video>
        <div id="users"></div>
      </div>
    </div>
  );
}

export default OneToN;
