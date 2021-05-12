import React, { useState, useEffect, useLayoutEffect } from "react";
import Navbar from "./Navbar.js";
import Sidebar from "./Sidebar.js";
import Search from "./Search.js";
import Messages from "./Messages.js";
import FavoritesRooms from "./tabs/FavoritesRooms.js";
import Home from "./Home.js";
import { getUser } from "./collections";
import api from "./api";

import { useHistory } from "react-router-dom";

function Accueil() {
  const [page, Setpage] = useState("home");
  const [logged, setLogged] = useState(false);
  // var username = "";
  const [username, setUsername] = useState(" ");
  // var logged = false;
  const history = useHistory();
  var id = localStorage.getItem("id");

  useLayoutEffect(() => {
    if (!id) history.push("/login");
  }, []);
  useEffect(() => {
    setLogged(true);
    api.get("/user/findbyid/" + id).then((res) => {
      setUsername(res.data.user.username);
    });
  }, []);
  function changepage() {
    switch (page) {
      case "messages":
        return <Messages />;
      case "home":
        return <Home />;
        return <Messages />;
      case "favorites":
        return <FavoritesRooms />;
      default:
        break;
    }
  }

  return (
    <div>
      <Navbar SetChangepage={Setpage} logged={logged} username={username} />
      <div className="accueil__body">
        {/* <Core changepage={changepage} /> */}
        {changepage()}
      </div>
    </div>
  );
}

export default Accueil;
