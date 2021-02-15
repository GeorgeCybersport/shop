import React from "react";
import { Url } from "../App";

export default function () {
  const url = React.useContext(Url);
  return (
    <div className="subscribe-box">
      <div className="container">
        <div className="left-part">
          <div className="quote">
            <img src={url + "Layer_40.png"} alt="face" />
            <p>
              “Vestibulum quis porttitor dui! Quisque viverra nunc mi, a
              pulvinar purus condimentum a. Aliquam condimentum mattis neque sed
              pretium”
            </p>
          </div>
          <div className="name">
            <p>Bin Burhan</p>
            <p>Dhaka, Bd</p>
          </div>
        </div>
        <div className="middle"></div>
        <div className="right-part">
          <h2>Subscribe</h2>
          <h3>FOR OUR NEWLETTER AND PROMOTION</h3>
          <form className="user-data">
            <input
              type="text"
              className="user-input"
              name="userdata"
              placeholder="Enter Your Email"
            />
            <button className="user-button" name="userdata">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
