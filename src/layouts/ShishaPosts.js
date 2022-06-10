import React, { useState, useEffect } from "react";

import PostCard from "../components/PostCard";
import authService from "../services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { appRoutes } from "../utils/routes";
import axios from "axios";
import { toBeInTheDOM } from "@testing-library/jest-dom/dist/matchers";

const ShishaJourney = () => {
  const shops = [
    {
      shopName: "Onfall",
      instagram: "Onfallll",
      address: "8/F, Aura on Pennington, Causeway Bay",
      time: "5pm-2am",
      logo: "https://res.cloudinary.com/bkarshehbaz-com/image/upload/v1652789201/WhatsApp_Image_2022-05-16_at_5.48.24_PM_umaojs.jpg",
      visited: false,
    },
    {
      shopName: "14:41",
      instagram: "1441.hk",
      address: "G/F., 41 Peel Street, Central",
      time: "12pm-12am (Sun off)",
      logo: "https://res.cloudinary.com/bkarshehbaz-com/image/upload/v1654655483/fourteenLatest_mzcaty.jpg",
      visited: false,
    },
    {
      shopName: "Teddy Bear",
      instagram: "Teddy.bear.hk",
      address: "Cosmos Building (Unit 803), 8-11 Lan Kwai Fong, Central",
      time: "4pm - 2am (Sun off)",
      logo: "https://res.cloudinary.com/bkarshehbaz-com/image/upload/v1652789201/WhatsApp_Image_2022-05-16_at_5.51.14_PM_i9xq3p.jpg",
      visited: false,
    },

    {
      shopName: "31_basement",
      instagram: "31_basement",
      address: "Basement, 31 Staunton Road, Central, Hong Kong",
      time: "6pm-2am",
      logo: "https://res.cloudinary.com/bkarshehbaz-com/image/upload/v1654654289/basementNew_orhsxy.jpg",
      visited: false,
    },

    {
      shopName: "Badroom Bar & Restaurant",
      instagram: "badroomhk",
      address: "5/F, 10 Knutsford Terrace, Tsim Sha Tsui",
      time: "Mon-Thurs 4pm-3am / Fri-Sat 4pm-4am / Sun 6pm-2am",
      logo: "https://res.cloudinary.com/bkarshehbaz-com/image/upload/v1654416359/WhatsApp_Image_2022-06-03_at_12.29.14_PM_m8y5mo.jpg",
      visited: false,
    },
  ];

  const [user, SetUser] = useState("");

  const [shopsVisited, SetVisitedShops] = useState([]);
  const [shopsNotVisited, SetNotVisitedShops] = useState(shops);
  const [loading, SetLoading] = useState(true);
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
    const FilterNotVisitedShops = [];
    if (shopsVisited.length) {
      // console.log("dataasfdas");
      for (let i = 0; i < shops.length; i++) {
        let element = [];
        for (let j = 0; j < shopsVisited.length; j++) {
          element = shops[i];
          if (shops[i].shopName === shopsVisited[j].shopName) {
            console.log(shops[i].shopName + "===" + shopsVisited[j].shopName);
            element.visited = true;
            break;
          }
        }
        FilterNotVisitedShops.push(element);
      }
      setTimeout(function () {}, 500);
      SetNotVisitedShops(FilterNotVisitedShops);
    } else {
      // SetNotVisitedShops(shops);
    }
  }, [shopsVisited]);

  console.log("shopsNotVisited", shopsNotVisited);

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
          // console.log("response", response.data);
          SetVisitedShops(response.data.response);
          SetLoading(false);
        })
        .catch((error) => {
          console.log("axios error", error);
        });
    }
  }, [user]);

  console.log("Visited Shops", shopsVisited);
  //   console.log(authService.getCurrentUser);
  // console.log("user", user);
  const postBackgroundStyle = {
    display: "flex",
    flexDirection: "column",
    fontSize: "14px",
    background: `url(background.png)`,
    backgroundSize: "cover",
  };

  const szLogoStyle = {
    alignSelf: "center",
    paddingTop: "22px",
  };

  const greetingMessageStyle = {
    alignSelf: "left",

    fontSize: "24px",
    fontWeight: "400",
    display: "flex",
    justifyContent: "space-around",
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

          <div style={greetingMessageStyle}>
            <button
              className="QR-btn"
              onClick={() => {
                send(appRoutes.QR);
              }}
              style={submitButton}
              type="submit"
            >
              Scan New QR
            </button>
          </div>
          <br />

          <div style={postsStyle}>
            {/* {loading === false && shopsVisited
              ? shopsVisited.map((item, id) => (
                  <PostCard
                    className="post-card"
                    unlocked={true}
                    checkedIn={true}
                    title={item.shopName}
                    openingHours={item.time}
                    address={item.address}
                    imgUrl={item.logo}
                    instagramLink={item.instagram}
                    instagramName={item.instagram}
                  />
                ))
              : "No Cafe CheckedIn"} */}

            {/* Show List of Unchecked Cafes */}
            {shopsNotVisited
              ? shopsNotVisited.map((item, id) =>
                  item.visited === false ? (
                    <PostCard
                      className="post-card"
                      unlocked={false}
                      checkedIn={false}
                      title={item.shopName}
                      openingHours={item.time}
                      address={item.address}
                      imgUrl={item.logo}
                      instagramLink={item.instagram}
                      instagramName={item.instagram}
                    />
                  ) : (
                    <PostCard
                      className="post-card"
                      unlocked={true}
                      checkedIn={true}
                      title={item.shopName}
                      openingHours={item.time}
                      address={item.address}
                      imgUrl={item.logo}
                      instagramLink={item.instagram}
                      instagramName={item.instagram}
                    />
                  )
                )
              : null}

            <button
              style={{ margin: "0 auto !impotant" }}
              onClick={(LogOut) => {
                send(appRoutes.REWARD);
              }}
              className="get-reward"
              type="submit"
            >
              Claim reward by completing the Shisha Journey
            </button>
            {/* <PostCard
              className="post-card"
              unlocked={true}
              checkedIn={true}
              title={`# shisha lounge name`}
              openingHours={`Mon-Sun  1pm til  Late`}
              address={`Soho, Hk Island`}
              imgUrl={`shisha_cover_photos.png`}
              instagramLink={`https://google.com`}
              instagramName={`shiroland_hk`}
            />
            <PostCard
              className="post-card"
              unlocked={false}
              checkedIn={false}
              title={`# shisha lounge name`}
              openingHours={`Mon-Sun  1pm til  Late`}
              address={`Soho, Hk Island`}
              imgUrl={`shisha_cover_photos.png`}
              instagramLink={`https://google.com`}
              instagramName={`shiroland_hk`}
            /> */}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ShishaJourney;
