import React, { useState, useEffect } from "react";
import Navbar from "./Navbar.js";
import Sidebar from "./Sidebar.js";
import Search from "./Search.js";
import Messages from "./Messages.js";
function Accueil() {
  const [page, Setpage] = useState("home");

  function changepage() {
    switch (page) {
      case "messages":
        return <Messages />;

      default:
        break;
    }
  }

  return (
    <div>
      <Navbar SetChangepage={Setpage} />
      <div className="accueil__body">
        {/* <Core changepage={changepage} /> */}
        {changepage()}
      </div>
    </div>
  );
}

export default Accueil;
