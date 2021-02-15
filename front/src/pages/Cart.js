import React from "react";
import { useSelector } from "react-redux";
import "../layout/styles/scss/shopping_cart.scss";
import { URL } from "../redux/keys";
import CartOrders from "../another_components/CartOrders";

const Cart = () => {
  //const { roleName, id } = useSelector(({ auth }) => auth);
  const [items, setItems] = React.useState([]);
  function checkUser() {
    fetch(
      URL + "orders/show" //, {
      //   method: "POST",
      //   headers: new Headers({
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   }),
      //   body: "roleName=" + roleName + "&userId=" + id,
      // }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result.result);
        setItems(result.result);
      });
  }
  React.useEffect(() => {
    checkUser();
  }, []);
  return (
    <main className="main">
      <div className="container">
        <h1>Список заказов</h1>
        {items.map((item) => (
          <CartOrders key={item.cartId} order={item} />
        ))}
      </div>
    </main>
  );
};

export default Cart;
