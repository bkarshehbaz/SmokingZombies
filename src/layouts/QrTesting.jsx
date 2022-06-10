import React, { useState, useEffect } from "react";
// import { Fab, TextareaAutosize } from "@material-ui/core";
// import { ArrowBack } from "@material-ui/icons";
// import { Link } from "react-router-dom";
import QrScan from "react-qr-reader";
import { appRoutes } from "../utils/routes";
import authService from "../services/auth.service";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function QRscanner() {
  const send = useNavigate();
  const [qrscan, setQrscan] = useState("No result");
  const [user, SetUser] = useState("");
  const handleScan = (data) => {
    if (data) {
      setQrscan(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  useEffect(() => {
    const user = authService.getCurrentUser();
    SetUser(user);
  }, []);
  useEffect(() => {
    if (
      qrscan === "Onfall" ||
      qrscan === "14:41" ||
      qrscan === "Teddy Bear" ||
      qrscan === "31_basement" ||
      qrscan === "Badroom Bar & Restaurant"
    ) {
      // Send request to backend for
      axios
        .post(
          "https://smoking-zombies-backend.herokuapp.com/api/auth/Addcheck",
          {
            username: user.username,
            shopname: qrscan,
          }
        )
        .then((response) => {
          send(appRoutes.SHISHA_JOURNEY);
        })
        .catch((error) => {});
    }
  }, [qrscan]);
  return (
    <div>
      {/* <Link to="/">
        <Fab style={{ marginRight: 10 }} color="primary">
          <ArrowBack />
        </Fab>
      </Link> */}
      {/* <span>QR Scanner</span> */}

      <center>
        <div style={{ marginTop: 30 }}>
          <QrScan
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ height: 240, width: 320 }}
          />
        </div>
      </center>

      <textarea
        style={{ fontSize: 18, width: 320, height: 100, marginTop: 100 }}
        rowsMax={4}
        defaultValue={qrscan}
        value={qrscan}
      ></textarea>
    </div>
  );
}

export default QRscanner;
