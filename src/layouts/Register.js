import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { appRoutes } from "../utils/routes";
import authService from "../services/auth.service";
import axios from "axios";
const Register = () => {
  const send = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const [user, SetUser] = useState("");
  useEffect(() => {
    const user = authService.getCurrentUser();
    SetUser(user);
  }, []);
  useEffect(() => {
    if (user && user.username) {
      send(appRoutes.SHISHA_JOURNEY);
    }
  });

  const performSignUp = (e) => {
    e.preventDefault();
    if (email === "" || password === "" || userName === "" || phone === "") {
      setError("Fields are required");
      return;
    } else {
      // authService.register(userName, email, password, phone);

      axios
        .post("https://smoking-zombies-backend.herokuapp.com/api/auth/signup", {
          username: userName,
          email,
          password,
          phone,
        })
        .then((response) => {
          send(appRoutes.LOGIN);
        });
    }
    // authService.login(email, password);
    console.log("SingUp called");
  };

  const registerStyle = {
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
    <div style={registerStyle}>
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
        <div>Please sign up to begin the shisha journey</div>
        <br />
        <br />
        <div style={inputForm}>
          <input
            style={inputStyle}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />
          <input
            style={inputStyle}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
          <input
            style={inputStyle}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            type="text"
            placeholder="Phone"
          />
          <input
            style={inputStyle}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            type="text"
            placeholder="User Name"
          />
          <br />
          <br />
          <button onClick={performSignUp} style={submitButton} type="submit">
            Register
          </button>
          <br />
          <div>
            Have an account?{" "}
            <Link to={appRoutes.LOGIN}>
              <a href="/login">Login</a>
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

export default Register;
