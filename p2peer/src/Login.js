import React from "react";
import Button from "@material-ui/core/Button";

import "./login.css";
function Login() {
  return (
    <div>
      <div className="login__container">
        <div className="login__form">
          <div className="login__email__text">Email address</div>
          <input type="text" className="login__email__input" />
          <div className="login__password__text">
            Password
            <small className="login__forgot__text">Forgot password?</small>
          </div>
          <input type="Password" className="login__password__input" />
          <div className="login__button__section">
            {/* <button className="login__button">Sign in</button> */}
            <Button
              variant="contained"
              className="login__button"
              color="primary"
            >
              Sign in
            </Button>
          </div>
        </div>
        <div className="login__signup">
          New to platform?{" "}
          <small className="login__signup__create">Create an account</small>
        </div>
      </div>
    </div>
  );
}

export default Login;
