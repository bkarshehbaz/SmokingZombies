import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { appRoutes } from "../utils/routes";
import authService from "../services/auth.service";

const testing = () => {
  // axios.get(`https://shisha-journey-backend.herokuapp.com`).then((res) => {
  //   console.log(res.data);
  // });
};

const Home = () => {
  const send = useNavigate();
  useEffect(() => {
    send(appRoutes.LOGIN);
  }, []);
  return (
    <div>
      Home
      <button onClick={testing}>test</button>
    </div>
  );
};

export default Home;
