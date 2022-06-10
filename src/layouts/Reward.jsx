import React, { useState, useEffect } from "react";

import PostCard from "../components/PostCard";
import authService from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { appRoutes } from "../utils/routes";
import fireworks from "./fireworks 1.png";
import axios from "axios";
const Reward = () => {
  const [user, SetUser] = useState("");

  const [shopsVisited, SetVisitedShops] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [reward, SetReward] = useState(false);
  const send = useNavigate();
  useEffect(() => {
    const user = authService.getCurrentUser();
    SetUser(user);
  }, []);
  useEffect(() => {
    if (user === null) {
      send(appRoutes.REGISTER);
    }
  });

  useEffect(() => {
    if (user && user.username) {
      axios
        .post(
          "https://smoking-zombies-backend.herokuapp.com/api/auth/AllChecks",
          {
            username: user.username,
          }
        )
        .then((response) => {
          console.log("response", response.data);
          SetVisitedShops(response.data.response);
          SetLoading(false);
        })
        .catch((error) => {
          console.log("axios error", error);
        });
    }
  }, [user]);

  console.log("Visited Shops", shopsVisited.response);
  //   console.log(authService.getCurrentUser);
  console.log("user", user);
  const postBackgroundStyle = {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    background: `url(background.png)`,
    backgroundSize: "cover",
    height: "100vh",
  };

  const szLogoStyle = {
    alignSelf: "center",
    paddingTop: "22px",
  };

  const greetingMessageStyle = {
    alignSelf: "left",
    marginLeft: "22px",
    fontSize: "24px",
    fontWeight: "400",
  };

  const postsStyle = {
    alignSelf: "center",
  };

  const submitButton = {
    width: "100px",
    height: "40px",
    background: "#47CEC7",
    borderRadius: "8px",
    color: "#fff",
    borderWidth: "0px",
    marginLeft: "90px",
  };

  const LogOut = (e) => {
    // e.preventDefault();
    authService.logout();
    send(appRoutes.LOGIN);
  };
  return (
    <div style={postBackgroundStyle}>
      <div style={szLogoStyle}>
        <img width={125} src="smoking-zombie-logo.png" alt="sz-logo" />
      </div>
      <br />
      {user && user.username ? (
        <>
          <div style={greetingMessageStyle}>
            {`Hello, ${user.username}`}
            <button onClick={LogOut} style={submitButton} type="submit">
              Logout
            </button>
          </div>

          <br />

          <div style={postsStyle}>
            {shopsVisited && shopsVisited.length === 5 ? (
              <div className="center">
                <div className="flex">
                  <p>Congratulations </p>
                  <img src={fireworks} />
                </div>
                <p className="center-para">
                  You have finished
                  <br /> the first stage of <br />
                  our Shisha Journey
                </p>

                <div
                  onClick={() => {
                    window.location.href = "https://discord.io/Smokingzombies";
                  }}
                  className="discord"
                >
                  Zombies,
                  <br />
                  Click Here to Claim Your Reward!
                </div>
              </div>
            ) : (
              <h3>Please complete the Shisha Journey</h3>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Reward;
