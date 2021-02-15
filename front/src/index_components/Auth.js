import React from "react";

import { useDispatch } from "react-redux";
import registration from "../helpFunction/registration";
import { login } from "../redux/actions/authActions";

const Auth = () => {
  const dispatch = useDispatch();
  const [registerMessage, setRegisterMessage] = React.useState({
    text: " ",
    className: " ",
  });
  const [registerName, setRegisterName] = React.useState("");
  const [registerLogin, setRegisterLogin] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [userLogin, setUserLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  async function register() {
    if (registerLogin && registerName && registerPassword) {
      const result = await registration(
        registerLogin,
        registerPassword,
        registerName,
        repeatPassword
      );
      console.log(result);
      if (result.response === "ok")
        setRegisterMessage({ text: result.result, className: "succsess" });
      else setRegisterMessage({ text: result.text, className: "error" });
    }
  }
  function log_in() {
    if (userLogin && password) {
      dispatch(login(userLogin, password));
    }
  }
  return (
    <div className="auth container">
      <div className="authField">
        <h1>Регистрация</h1>
        <input
          type="text"
          value={registerName}
          onChange={(event) => {
            setRegisterName(event.target.value);
          }}
          placeholder="Введите имя"
        />
        <input
          type="text"
          value={registerLogin}
          onChange={(event) => {
            setRegisterLogin(event.target.value);
          }}
          placeholder="Введите email"
        />
        <input
          type="password"
          value={registerPassword}
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
          placeholder="Введите пароль"
        />
        <input
          type="password"
          value={repeatPassword}
          onChange={(event) => {
            setRepeatPassword(event.target.value);
          }}
          placeholder="Введите пароль"
        />
        <button
          onClick={() => {
            register();
          }}
        >
          Register
        </button>
        <div className={"message " + registerMessage.className}>
          {registerMessage.text}
        </div>
      </div>
      <div className="authField">
        <h1>Авторизация</h1>
        <input
          type="text"
          value={userLogin}
          onChange={(event) => {
            setUserLogin(event.target.value);
          }}
          placeholder="Введите email"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Введите пароль"
        />
        <button
          onClick={() => {
            log_in();
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default Auth;
