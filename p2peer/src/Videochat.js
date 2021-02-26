import React, { useRef, useEffect, useState } from "react";
import "./videochat.css";
import io from "socket.io-client";
import Peer from "simple-peer";
function Videochat() {
  const uservideo = useRef();
  const partnervideo = useRef();
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const peersRef = useRef([]);

  const videoConstraints = {
    height: window.innerHeight / 2,
    width: window.innerWidth / 2,
  };
  useEffect(() => {
    socketRef.current = io.connect("/");
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        uservideo.current.srcObject = stream;
        socketRef.current.emit("join");
        socketRef.current.on("partner", (partnerid) => {
          const peer = createPeer(partnerid, socketRef.current.id, stream);
          peersRef.current.push({
            peerID: partnerid,
            peer,
          });
          peers.push(peer);
          setPeers(peers);
        });
        socketRef.current.on("user joined", (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream);
          peersRef.current.push({
            peerID: payload.callerID,
            peer,
          });

          setPeers((users) => [...users, peer]);
        });
        socketRef.current.on("receiving returned signal", (payload) => {
          const item = peersRef.current.find((p) => p.peerID === payload.id);
          item.peer.signal(payload.signal);
        });
      });

    // peers.forEach((peer) => {
    //   peer.on("stream", (stream) => {
    //     partnervideo.current.srcObject = stream;
    //   });
    // });
  }, []);

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerID,
        signal,
      });
    });

    return peer;
  }

  return (
    <div className="container">
      <video className="uservideo" playsInline autoPlay ref={uservideo}></video>
      <video
        className="partnervideo"
        playsInline
        autoPlay
        ref={partnervideo}
      ></video>
    </div>
  );
}

export default Videochat;
