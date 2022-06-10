import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { appRoutes } from "./utils/routes";

// import Navbar from './components/layout/Navbar';
import Home from "./layouts/Home";
import Login from "./layouts/Login";
import Register from "./layouts/Register";
import CheckIn from "./layouts/CheckIn";
import QRSuccess from "./layouts/QRSuccess";
import QRFail from "./layouts/QRFail";
import About from "./layouts/About";
import ShishaPosts from "./layouts/ShishaPosts";
import Reward from "./layouts/Reward";
import QR from "./layouts/Qr";
import Forget from "./layouts/forget";
import QRscanner from "./layouts/QrTesting";
function App() {
  const style = {
    margin: 0,
    padding: 0,
    height: "100vh",
  };
  return (
    <div className="root-page" style={style}>
      {/* <Layout> put <Navbar/> inside here */}
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path={appRoutes.HOME} element={<Home />} />
          <Route path={appRoutes.LOGIN} element={<Login />} />
          <Route path={appRoutes.REGISTER} element={<Register />} />
          <Route path={appRoutes.SHISHA_JOURNEY} element={<ShishaPosts />} />
          <Route path={appRoutes.CHECK_IN} element={<CheckIn />} />
          <Route path={appRoutes.QR_SUCCESS} element={<QRSuccess />} />
          <Route path={appRoutes.QR_FAIL} element={<QRFail />} />
          <Route path={appRoutes.ABOUT} element={<About />} />
          <Route path={appRoutes.REWARD} element={<Reward />} />
          <Route path={appRoutes.FORGET} element={<Forget />} />
          <Route path={appRoutes.TESTING} element={<QRscanner />} />

          <Route path="/QR" element={<QR />} />
        </Routes>
      </BrowserRouter>
      {/* </Layout> */}
    </div>
  );
}
export default App;
