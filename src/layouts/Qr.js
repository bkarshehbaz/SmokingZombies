import React, { useState, useRef, useEffect } from "react";
import { appRoutes } from "../utils/routes";
import authService from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  makeStyles,
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import QRCode from "qrcode";
import QrReader from "react-qr-reader";

function App() {
  const [user, SetUser] = useState("");
  const send = useNavigate();
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");

  const [Success, setSuccess] = useState(false);
  const classes = useStyles();
  const qrRef = useRef(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    SetUser(user);
  }, []);
  useEffect(() => {}, []);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleErrorFile = (error) => {
    console.log(error);
  };
  const handleScanFile = (result) => {
    if (result) {
      setScanResultFile(result);
      // Send request to backend for
      axios
        .post(
          "https://smoking-zombies-backend.herokuapp.com/api/auth/Addcheck",
          {
            username: user.username,
            shopname: result,
          }
        )
        .then((response) => {
          setSuccess(true);
          send(appRoutes.SHISHA_JOURNEY);
        })
        .catch((error) => {});
    }
  };
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };
  const handleErrorWebCam = (error) => {
    console.log(error);
  };
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result);
    }
  };
  return (
    <Container className={classes.conatiner}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Button
                className={classes.btn}
                variant="contained"
                color="secondary"
                onClick={onScanFile}
              >
                Scan Qr Code
              </Button>
              <QrReader
                ref={qrRef}
                delay={300}
                style={{ width: "100%" }}
                onError={handleErrorFile}
                onScan={handleScanFile}
                legacyMode
              />
              <h3>Scanned Result: {Success === true ? "Success" : null}</h3>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10,
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#3f51b5",
    color: "#fff",
    padding: 20,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
  },
}));
export default App;
