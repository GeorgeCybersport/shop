import React from "react";

import { Url } from "../App";
import Cart from "./Cart";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/authActions";

export default function () {
  const dispatch = useDispatch();
  const name = useSelector(({ auth }) => auth.name);
  const [isOpen, setIsOpen] = React.useState(false);
  const [showProfile, setShowProfile] = React.useState(false);
  const url = React.useContext(Url);
  const showCart = () => {
    setIsOpen(!isOpen);
  };
  const openProfile = () => {
    setShowProfile(!showProfile);
  };
  const exit = () => {
    dispatch(logout());
  };
  return (
    <header className="header container">
      <div className="header-first-part">
        <Link to="/" className="logo">
          Bran<span>d</span>
        </Link>
        <Search />
      </div>
      <div className="account-block">
        <img
          src={url + "cart.png"}
          alt="cart"
          onClick={() => {
            showCart();
          }}
          className="header__cart"
        />
        {isOpen && <Cart />}
        <button
          name="accountBar"
          className="header__account-bar"
          onClick={() => {
            openProfile();
          }}
        >
          My Account <i className="fas fa-caret-down"></i>
        </button>
        {showProfile && (
          <div className="dropdown-profile">
            <div clasName="profile-name">
              <div>Имя:</div>
              <div>{name}</div>
            </div>
            <button onClick={() => exit()}>Logout</button>
            <Link to="/cart">
              <button>Check orders</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
