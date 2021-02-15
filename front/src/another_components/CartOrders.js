import React from "react";
import CartItems from "./CartItems";

const CartOrders = ({ order }) => {
  const [open, setOpen] = React.useState(false);
  function showInfo() {
    setOpen(!open);
  }
  return (
    <div>
      <button class="checkout-button" onClick={showInfo}>
        {order.userName} {order.date} {order.sum}
      </button>
      {open && (
        <>
          <div className="main-headers">
            <div className="product">Product Details</div>
            <div className="price">unite Price</div>
            <div className="quantity">Quantity</div>
            <div className="shipping">User name</div>
            <div className="subtotal">Order Id</div>
            <div className="action">SUBTOTAL</div>
          </div>
          {order.items.map((item) => (
            <CartItems
              key={item.id}
              name={order.userName}
              id={order.id}
              item={item}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CartOrders;
