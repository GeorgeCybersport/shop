import {
  ADD_PRODUCT,
  BASKET_URL,
  CLEAR_CART,
  GET_CART,
  REMOVE_PRODUCT,
  URL,
} from "../keys";

export function getUserCart(/*id*/) {
  return async (dispatch) => {
    try {
      const result = await fetch(
        BASKET_URL //, {
        //   method: "POST",
        //   headers: new Headers({
        //     "Content-Type": "application/x-www-form-urlencoded",
        //   }),
        //   body: "userId=" + id,
        /*}*/
      ).then((res) => res.json());
      if (result.response === "ok") {
        dispatch({
          type: GET_CART,
          totalPrice: result.result.totalprice,
          items: result.result.items,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
}
export function addToUserCart(/*userId*/ itemId) {
  return async (dispatch) => {
    try {
      const result = await fetch(BASKET_URL + "add", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: /*"userId=" + userId + */ "itemId=" + itemId,
      }).then((res) => res.json());
      if (result.response === "ok") {
        dispatch({
          type: ADD_PRODUCT,
          item: result.result.item,
          totalPrice: result.result.totalprice,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export function removeFromUserCart(/*userId*/ itemId) {
  return async (dispatch) => {
    try {
      const result = await fetch(BASKET_URL + "remove", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: /*"userId=" + userId + */ "itemId=" + itemId,
      }).then((res) => res.json());
      if (result.response === "ok") {
        dispatch({
          type: REMOVE_PRODUCT,
          item: result.result.item,
          totalPrice: result.result.totalprice,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export function clearUserCart(/*userId*/) {
  return async (dispatch) => {
    try {
      const result = await fetch(BASKET_URL + "clear", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        //body: "userId=" + userId,
      }).then((res) => res.json());
      if (result.response === "ok") {
        dispatch({
          type: CLEAR_CART,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export function orderAction(/*id*/) {
  return async (dispatch) => {
    try {
      const result = await fetch(
        URL + "orders" //, {
        //   method: "POST",
        //   headers: new Headers({
        //     "Content-Type": "application/x-www-form-urlencoded",
        //   }),
        //   body: "userId=" + id,
        // }
      ).then((res) => res.json());
      if (result.response === "ok") {
        alert("Спасибо за покупку!");
        dispatch({
          type: CLEAR_CART,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
