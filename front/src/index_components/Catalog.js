import React from "react";
import { Url } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { addToUserCart } from "../redux/actions/cartActions";
import { URL } from "../redux/keys";

export default function () {
  //const id = useSelector(({ auth }) => auth.id);
  const dispatch = useDispatch();
  const [items, setItems] = React.useState([]);
  const url = React.useContext(Url);
  function getData() {
    fetch(URL + "catalog")
      .then((res) => res.json())
      .then((result) => {
        if (result.response === "ok") setItems(result.result);
      });
  }
  function changeCart(item) {
    dispatch(addToUserCart(/*id,*/ item.id));
  }
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className="f-items">
      <div className="container">
        <h2>Featured items</h2>
        <p>Shop for items based on what we featured in this week</p>
        <div className="f-blocks">
          {items.map((item) => (
            <div key={item.id} className="f-content">
              <div className="visible">
                <a href="#">
                  <img src={url + item.imgUrl} alt="l2" />
                </a>
                <div className="f-textbox">
                  <a href="#">
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                  </a>
                </div>
              </div>
              <div className="shadow">
                <div className="shadow_box">
                  <a>
                    <button
                      onClick={() => {
                        changeCart(item);
                      }}
                    >
                      <img src={url + "cart1.svg"} alt="cart1" />
                      <p>Add to card</p>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
