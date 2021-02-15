import React from "react";

import { Route, Switch } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import Index from "./pages/Index";
import Header from "./index_components/Header";
import Nav from "./index_components/Nav";
import SubscribeBox from "./index_components/SubscribeBox";
import FooterNav from "./index_components/FooterNav";
import Footer from "./index_components/Footer";
import Auth from "./index_components/Auth";
import Cart from "./pages/Cart";
import { getUserCart } from "./redux/actions/cartActions";
import { authorized /*login*/ } from "./redux/actions/authActions";

export const Url = React.createContext();

function App() {
  const dispatch = useDispatch();
  // const userdata = [
  //   {
  //     login: "egorka",
  //     password: "egorka",
  //   },
  //   {
  //     login: "egorka1",
  //     password: "egorka1",
  //   },
  // ];
  //const enterData = userdata[1];
  //const id = useSelector(({ auth }) => auth.id);
  const isAuth = useSelector(({ auth }) => {
    return auth.isAuth;
  }, shallowEqual);
  const url =
    "https://raw.githubusercontent.com/GeorgeCybersport/JavaScript-Basic/master/";
  function getCart() {
    dispatch(getUserCart(/*id*/));
  }
  function getAuth() {
    dispatch(authorized() /*login(enterdata.login, enterdata.password)*/);
  }
  React.useEffect(() => {
    getAuth();
  }, []);
  React.useEffect(() => {
    if (isAuth) {
      getCart();
    }
  }, [isAuth]);
  return (
    <Url.Provider value={url}>
      {isAuth ? (
        <>
          <Header />
          <div className="headerLine"></div>
          <Nav />
          <Switch>
            <Route path="/" component={Index} exact />
            <Route path="/cart" component={Cart} exact />
          </Switch>
          <SubscribeBox />
          <FooterNav />
          <Footer />
        </>
      ) : (
        <Auth />
      )}
    </Url.Provider>
  );
}

export default App;
