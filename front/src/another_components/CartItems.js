import React from "react";
import { Url } from "../App";

const CartItems = ({ name, id, item }) => {
  const url = React.useContext(Url);
  return (
    <div className="product-block">
      <div className="product">
        <div className="product-img">
          <img src={url + item.imgUrl} alt="photo" />
        </div>
        <div className="product-textbox">
          <div>{item.name}</div>
          <div className="product-text">
            Color: <span>Red</span>
          </div>
          <div className="product-text">
            Size: <span>Xll</span>{" "}
          </div>
        </div>
      </div>
      <div className="price">{item.price}$</div>
      <div className="quantity">
        <input
          disabled
          type="text"
          placeholder={item.item_amount}
          pattern="^([0-9]+)$"
        />
      </div>
      <div className="shipping">{name}</div>
      <div className="user_id">{id}</div>
      <div className="subtotal">{item.item_subtotal}$</div>
    </div>
  );
};

export default CartItems;
