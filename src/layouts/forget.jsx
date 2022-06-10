import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { appRoutes } from "../utils/routes";
import authService from "../services/auth.service";
import axios from "axios";
const Login = () => {
  const [user, SetUser] = useState("");
  const send = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [results, setResults] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    const user = authService.getCurrentUser();
    SetUser(user);
  }, []);
  useEffect(() => {
    if (user && user.username) {
      send(appRoutes.SHISHA_JOURNEY);
    }
  });

  const resetPassword = async () => {
    setSuccess("");
    setError("");
    if (email === "") {
      setError("Email is Required");
      return;
    } else {
      await axios
        .post(
          "https://smoking-zombies-backend.herokuapp.com/api/auth/resendpassword",
          {
            email,
          }
        )
        .then((response) => {
          setSuccess(
            "New Password For Your Account Hasn Been Sent To Your Email.(Please Also Check Your Spam Folder)"
          );

          setTimeout(function () {
            send(appRoutes.LOGIN);
          }, 2000);
        })
        .catch((error) => {
          setError("Email Is Not Correct Or Wrong");
          console.log("login error actions", error);
        });
    }
  };

  const loginStyle = {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    height: "100vh",
    background: `url(background.png)`,
    backgroundSize: "cover",
  };

  const szLogoStyle = {
    alignSelf: "center",
    paddingTop: "22px",
  };

  const firstZombieStyle = {
    alignSelf: "center",
  };

  const coverCircleStyle = {
    backgroundColor: "#fff",
    borderRadius: "999px",
    padding: "15px",
    opacity: "0.5",
    width: "250px",
    height: "250px",
  };

  const firstZombieImgStyle = {
    position: "absolute",
    top: 85,
    left: "22.5vw",
  };

  const mainBodyStyle = {
    marginTop: "10px",
    padding: "15px 32px",
    height: "700px",
    background: "url('form-background.png')",
    backgroundSize: "cover",
  };

  const welcomeStyle = {
    fontWeight: "strong",
    fontSize: "24px",
  };

  const inputForm = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const inputStyle = {
    background: "#fff",
    opacity: "0.75",
    borderRadius: "8px",
    width: "336px",
    height: "46px",
    margin: "8px 0",
    borderWidth: "0px",
    padding: "0 0 0 20px",
  };

  const submitButton = {
    width: "336px",
    height: "46px",
    background: "#47CEC7",
    borderRadius: "8px",
    color: "#fff",
    borderWidth: "0px",
  };

  return (
    <div style={loginStyle}>
      <div style={szLogoStyle}>
        <img width={125} src="smoking-zombie-logo.png" alt="sz-logo" />
      </div>
      <div style={firstZombieStyle}>
        <div style={coverCircleStyle}></div>
        <img
          style={firstZombieImgStyle}
          width={230}
          src="first_sz.png"
          alt="sz-logo"
        />
      </div>
      <div style={mainBodyStyle}>
        <br />
        <div style={welcomeStyle}>Forget Password</div>
        <br />
        <div>Please Enter your Email</div>
        <br />
        <br />
        <div style={inputForm}>
          <input
            style={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <small style={{ color: "red" }}>{error ? error : null}</small>
          <small style={{ color: "green" }}>{success ? success : null}</small>
          <br />
          <br />
          <button onClick={() => resetPassword()} style={submitButton}>
            Reset Password
          </button>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Login;
