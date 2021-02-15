import { URL } from "../redux/keys";
export default async function (
  registerLogin,
  registerPassword,
  registerName,
  repeatPassword
) {
  try {
    const result = await fetch(URL + "registration", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      body:
        "login=" +
        registerLogin +
        "&password=" +
        registerPassword +
        "&name=" +
        registerName +
        "&repeat=" +
        repeatPassword,
    }).then((res) => res.json());
    return result;
  } catch (error) {
    return false;
  }
}
