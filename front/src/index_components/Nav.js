import React from "react";

import Navdrop from "./Navdrop";

export default function () {
  const linkNames = [
    "man",
    "woman",
    "kids",
    "ACCOSERIESE",
    "FEATURED",
    "HOT DEAL",
  ];

  return (
    <nav className="topNav">
      <div className="nav-block">
        <a href="index.html">Home</a>
      </div>
      {linkNames.map((name, index) => (
        <div key={index} className="nav-block">
          <a href="#">{name}</a>
          <Navdrop />
        </div>
      ))}
    </nav>
  );
}
