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

  useEffect(() => {
    const user = authService.getCurrentUser();
    SetUser(user);
  }, []);
  useEffect(() => {
    if (user && user.username) {
      send(appRoutes.SHISHA_JOURNEY);
    }
  });

  useEffect(() => {
    console.log("results", results);
    if (results && results.status === true) {
      console.log("Jump on another page");
      send(appRoutes.SHISHA_JOURNEY);
    } else {
      setError("All Fields are required");
      console.log("Login Error from component");
    }
  }, [results]);
  const performLogin = async () => {
    // alert("Working");
    if (email === "" || password === "") {
      alert("error");
      setError("Fields are required");
      return;
    } else {
      axios
        .post("https://smoking-zombies-backend.herokuapp.com/api/auth/login", {
          email,
          password,
        })
        .then((response) => {
          if (response.data.access_token) {
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log("login success action", response.data);
            setResults(response.data);
          }
        })
        .catch((error) => {
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
        <div style={welcomeStyle}>Welcome</div>
        <br />
        <div>Please log in to begin the shisha journey</div>
        <br />
        <br />
        <div style={inputForm}>
          <input
            style={inputStyle}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <input
            style={inputStyle}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <br />
          <br />
          <button onClick={() => performLogin()} style={submitButton}>
            Login
          </button>
          <br />
          <div>
            Don't have an account?{" "}
            <Link to={appRoutes.REGISTER}>
              <a href="/register">Register</a>
            </Link>
          </div>
          <br />
          <div>
            Forget Password?{" "}
            <Link to={appRoutes.FORGET}>
              <a href="/forget">Click here</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
