import React from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { clearUserCart, orderAction } from "../redux/actions/cartActions";
import CartItem from "./CartItem";

export default function Cart() {
  const dispatch = useDispatch();
  // const id = useSelector(({ auth }) => auth.id);
  const { items, totalPrice } = useSelector(({ cartReducer }) => {
    return {
      items: cartReducer.items,
      totalPrice: cartReducer.totalPrice,
    };
  }, shallowEqual);
  function clearCart() {
    dispatch(clearUserCart(/*id*/));
  }
  function buyProducts() {
    dispatch(orderAction(/*id*/));
  }
  return (
    <div className="dropdown-buy">
      <div className="cart-products">
        {items.map((item) => (
          <CartItem key={item.id} item={item} /*id={id}*/ />
        ))}
      </div>
      <div className="total-price-drop">
        <div className="total-drop-textbox">
          <div>total</div>
          <div>{totalPrice}$</div>
        </div>
        <button
          onClick={() => {
            buyProducts();
          }}
        >
          Buy
        </button>
        <button
          onClick={() => {
            clearCart();
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
