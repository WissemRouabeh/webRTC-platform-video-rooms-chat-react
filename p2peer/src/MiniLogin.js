import React from "react";
import "./minilogin.css";
function MiniLogin({ show }) {
  return (
    <div>
      <div
        className="minilogin__form"
        style={{
          display: show ? "flex" : "none",
          marginLeft: show ? "-20vw" : "20vw",
        }}
        // style={{ marginLeft: "-20vw" }}
      >
        <input placeholder="Email" type="text" />
        <input placeholder="Password" type="text" />
        <button className="minilogin__button">Login</button>
        <div className="minilogin__message">*error holder</div>
      </div>
    </div>
  );
}

export default MiniLogin;
