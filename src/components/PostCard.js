import React from "react";
import checkTransparent from "../layouts/checkTransparent.png";
const PostCard = ({
  unlocked,
  checkedIn,
  title,
  imgUrl,
  openingHours,
  address,
  instagramLink,
  instagramName,
}) => {
  const cardStyle = {
    background: "#fff",
    width: "360px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    borderRadius: "4px",
    padding: "10px",
    margin: "0 0 50px 0",
  };

  const titleStyle = {
    color: "#262628",
    fontSize: "20px",
    margin: "20px 15px",
    fontWeight: "600",
  };

  const coverPhotoStyle = {
    margin: "5px 5px",
    opacity: "0.8",
    alignSelf: "center",
  };

  const detailsStyle = {
    display: "flex",
    flexDirection: "row",
    fontSize: "12px",
    fontWeight: "300",
    margin: "7px 0px 0px 5px",
  };

  if (unlocked && !checkedIn) {
    //show normal posts
    return (
      <div className="cafe-blocks" style={cardStyle}>
        <div style={titleStyle}>{`${title}`}</div>
        <div style={coverPhotoStyle}>
          <img src={`${imgUrl}`} width="100%" alt="shisha" />
        </div>
        <div className="icons-wrapper" style={detailsStyle}>
          <img src="icons/clock.png" width="25px" alt="clock" />
          <div style={{ margin: "4px" }}>{`${openingHours}`}</div>
        </div>
        <div className="icons-wrapper" style={detailsStyle}>
          <img src="icons/globe.png" width="25px" alt="globe" />
          <div style={{ margin: "4px" }}>{`${address}`}</div>
        </div>
        <div className="icons-wrapper" style={detailsStyle}>
          <img src="icons/instagram.png" width="25px" alt="instagram" />
          <div style={{ margin: "4px" }}>
            <a href={`https://www.instagram.com/${instagramName}  `}>
              {instagramName}
            </a>
          </div>
        </div>
        <br />
      </div>
    );
  } else if (unlocked && checkedIn) {
    return (
      <div className="cafe-blocks" style={cardStyle}>
        <div style={titleStyle}>{`${title}`}</div>
        <div
          style={{
            margin: "5px 5px",
            opacity: "0.8",
            alignSelf: "center",
            backgroundImage: `url(${imgUrl})`,
            minHeight: "200px",
            backgroundSize: "100% 100%",
          }}
        >
          {/* <img src={`${imgUrl}`} width="100%" alt="shisha" /> */}
          <img
            src={checkTransparent}
            className="checkedInImage"
            width="100%"
            alt="shisha"
          />
        </div>
        <div className="icons-wrapper" style={detailsStyle}>
          <img src="icons/clock.png" width="25px" alt="clock" />
          <div style={{ margin: "4px" }}>{`${openingHours}`}</div>
        </div>
        <div className="icons-wrapper" style={detailsStyle}>
          <img src="icons/globe.png" width="25px" alt="globe" />
          <div style={{ margin: "4px" }}>{`${address}`}</div>
        </div>
        <div className="icons-wrapper" style={detailsStyle}>
          <img src="icons/instagram.png" width="25px" alt="instagram" />
          <div style={{ margin: "4px" }}>
            <a href={`https://www.instagram.com/${instagramName}  `}>
              {instagramName}
            </a>
          </div>
        </div>
        <br />
      </div>
    );
  } else {
    return (
      <div className="cafe-blocks" style={cardStyle}>
        <div style={titleStyle}>{`${title}`}</div>
        <div style={coverPhotoStyle}>
          <img src={`${imgUrl}`} width="100%" alt="shisha" />
        </div>
        <div className="icons-wrapper" style={detailsStyle}>
          <img src="icons/clock.png" width="25px" alt="clock" />
          <div style={{ margin: "4px" }}>{`${openingHours}`}</div>
        </div>
        <div className="icons-wrapper" style={detailsStyle}>
          <img src="icons/globe.png" width="25px" alt="globe" />
          <div style={{ margin: "4px" }}>{`${address}`}</div>
        </div>
        <div className="icons-wrapper" style={detailsStyle}>
          <img src="icons/instagram.png" width="25px" alt="instagram" />
          <div style={{ margin: "4px" }}>
            <a href={`https://www.instagram.com/${instagramName}  `}>
              {instagramName}
            </a>
          </div>
        </div>
        <br />
      </div>
      // <div style={cardStyle}>
      //   <img src="lock_cover.png" width="355px" alt="locked" />
      //   <br />
      // </div>
    );
  }
};

export default PostCard;
