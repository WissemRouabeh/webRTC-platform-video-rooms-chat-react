import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./register.css";
import api from "./api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [security_question, setSecurity_question] = useState("");
  const [error, setError] = useState("");

  function validateForm() {
    // var valid = true;
    if (!validateEmail()) {
      setError("Make sure you enter a valid email");
      return false;
    } else if (fullname.length < 3 && !noSymbols(fullname)) {
      setError("Enter a valid fullname with no symbols ");
      return false;
    } else if (username.length < 3 && !noSymbols(username)) {
      setError("Enter a valid username with no symbols ");
      return false;
    } else if (!validatePassword()) {
      setError(
        "Password must contain at least 8 caracter, 1 upper letter and 1 digit"
      );
      return false;
    } else if (password !== confirm_password) {
      setError("The confirm password confirmation does not match");
      return false;
    } else if (security_question.length < 3 && !noSymbols(security_question)) {
      setError("Enter a valid answer with no symbols ");
      return false;
    } else {
      setError("");
      return true;
    }
    function noSymbols(word) {
      const usernameRegex = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/;
      return usernameRegex.test(String(word).toLowerCase());
    }
    function validateEmail() {
      const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(String(email).toLowerCase());
    }
    function validatePassword() {
      // const passwordRegex = /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/;
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      return passwordRegex.test(String(password));
    }
  }
  async function register() {
    const user = {
      email,
      password,
      username,
      fullname,
      security_question,
    };
    await api
      .post("/user/adduser", user)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <div className="register__container">
        <div className="register__form">
          <div className="register__email__text">Email address</div>
          <input
            type="email"
            className="register__email__input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div className="register__email__text">Full name</div>
          <input
            type="text"
            className="register__email__input"
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
            }}
          />
          <div className="register__email__text">Username</div>
          <input
            type="text"
            className="register__email__input"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <div className="register__password__text">Password</div>
          <input
            type="password"
            className="register__password__input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="register__password__text">Confirm password</div>
          <input
            type="Password"
            className="register__password__input"
            value={confirm_password}
            onChange={(e) => {
              setConfirm_password(e.target.value);
            }}
          />
          <div className="register__email__text">
            What's your favorite fruit?
          </div>
          <input
            type="text"
            className="register__email__input"
            value={security_question}
            onChange={(e) => {
              setSecurity_question(e.target.value);
            }}
          />
          <div className="register__button__section">
            {/* <button className="register__button">Sign in</button> */}
            <Button
              variant="contained"
              className="register__button"
              color="primary"
              onClick={() => validateForm() && register()}
            >
              Register
            </Button>
          </div>
          <small style={{ fontSize: "11px", color: "red" }}>{error}</small>
        </div>
        <div className="register__signup">
          You already have an account?{" "}
          <small className="register__signup__create">Login</small>
        </div>
      </div>
    </div>
  );
}

export default Register;
