import React from "react";

export default function ({ iteminfo }) {
  const { image, head, text } = iteminfo;
  return (
    <div className="offer-content">
      <img src={image} alt="delivery" />
      <div className="content-textbox">
        <h3>{head}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
