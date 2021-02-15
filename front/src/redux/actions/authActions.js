import { IS_AUTH, IS_NOT_AUTH, URL } from "../keys";

export function login(userLogin, userPassword) {
  return async (dispatch) => {
    try {
      const result = await fetch(URL + "login", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: "login=" + userLogin + "&password=" + userPassword,
      }).then((res) => res.json());
      if (result.response === "ok") {
        dispatch({
          type: IS_AUTH,
          name: result.result,
          // id: result.result.id,
          // roleName: result.result.roleName,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export function authorized() {
  return async (dispatch) => {
    try {
      const result = await fetch(URL + "authorized").then((res) => res.json());
      if (result.response === "ok") {
        console.log(result);
        dispatch({
          type: IS_AUTH,
          name: result.result,
          // id: result.result.id,
          // roleName: result.result.roleName,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
}
export function logout() {
  return async (dispatch) => {
    try {
      fetch(URL + "logout")
        .then((res) => res.json())
        .then((result) => {
          if (result.response === "ok")
            dispatch({
              type: IS_NOT_AUTH,
            });
        });
    } catch (error) {
      console.log(error);
    }
  };
}
