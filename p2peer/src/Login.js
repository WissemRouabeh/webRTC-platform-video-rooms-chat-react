import React, { useState } from "react";
import Button from "@material-ui/core/Button";
// import { useSelector, useDispatch } from "react-redux";
// import { signin, logout } from "./redux/actions";
import { useHistory } from "react-router-dom";

import api from "./api";
import "./login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  // const isLogged = useSelector((state) => state.isLogged);
  // const dispatch = useDispatch();
  function validateEmail() {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(String(email).toLowerCase())) {
      setError("Make sure you write a valid email");
      return false;
    } else {
      setError("");
      return true;
    }
  }
  async function Login() {
    const user = { email, password };
    await api
      .post("/user/login", user)
      .then((res) => {
        console.log(res.data);
        setError("");
        var user = res.data.user;
        localStorage.setItem("id", user._id);
        localStorage.setItem("username", user.username);
        localStorage.setItem("live", false);
        history.push("/accueil");

        // dispatch(signin({ user }));
      })
      .catch((err) => setError("Email or password incorrect"));
  }
  return (
    <div>
      <div className="login__container">
        <div className="login__form">
          <div className="login__email__text">Email address</div>
          <input
            type="text"
            className="login__email__input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="login__password__text">
            Password
            <small className="login__forgot__text">Forgot password?</small>
          </div>
          <input
            type="Password"
            className="login__password__input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="login__button__section">
            {/* <button className="login__button">Sign in</button> */}
            <Button
              variant="contained"
              className="login__button"
              color="primary"
              onClick={() => validateEmail() && Login()}
            >
              Sign in
            </Button>
          </div>
          <small style={{ fontSize: "11px", color: "red" }}>{error}</small>
        </div>
        <div className="login__signup">
          New to platform?{" "}
          <small className="login__signup__create">Register now</small>
        </div>
      </div>
    </div>
  );
}

export default Login;
