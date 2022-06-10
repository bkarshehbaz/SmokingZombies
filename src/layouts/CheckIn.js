import React, { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";

const CheckIn = () => {
  const [scanResultFile, setScanResultFile] = useState("");
  const [scanResultWebCam, setScanResultWebCam] = useState("");
  const qrRef = useRef(null);

  const handleErrorFile = (error) => {
    console.log(error);
  };

  const handleScanFile = (result) => {
    if (result) {
      console.log("result", result);
      setScanResultFile(result);
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
    <>
      <button onClick={onScanFile}> scan file</button>
      <QrReader
        ref={qrRef}
        delay={300}
        style={{ height: "380px", width: "380px" }}
        onError={handleErrorFile}
        onScan={handleScanFile}
        legacyMode
      />
      <h3>Scanned Code: {scanResultFile}</h3>
    </>
  );
};

export default CheckIn;
