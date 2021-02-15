import React from "react";

import { useDispatch } from "react-redux";
import { Url } from "../App";
import { removeFromUserCart } from "../redux/actions/cartActions";

const CartItem = ({ item /*id*/ }) => {
  const url = React.useContext(Url);
  console.log(url + item.imgUrl);
  const dispatch = useDispatch();
  function changeCart() {
    dispatch(removeFromUserCart(/*id*/ item.id));
  }
  return (
    <div className="product-drop">
      <div className="sell-block">
        <img src={url + item.imgUrl} alt="pic" />
        <div className="product-drop-textbox">
          <div>{item.name}</div>
          <span>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
          </span>
          <div>
            {" "}
            {item.itemAmount} <span>x</span> {item.price}
          </div>
        </div>
      </div>
      <div className="action">
        <a
          onClick={() => {
            changeCart();
          }}
          className="fas fa-times-circle"
        ></a>
      </div>
    </div>
  );
};

export default CartItem;
