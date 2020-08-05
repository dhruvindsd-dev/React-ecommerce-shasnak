import React, { useEffect, Suspense } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import ScrollToTop from "./helpers/scroll-top";
import { ToastProvider } from "react-toast-notifications";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import { useSelector } from "react-redux";
import RegisterScreen from "./screens/RegisterScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrdersScreen from "./screens/OrdersScreen";
import Product from "./pages/shop-product/Product";
import Cart from "./pages/other/Cart";
import Checkout from "./pages/other/Checkout";
import Wishlist from "./pages/other/Wishlist";
import Compare from "./pages/other/Compare";
import About from "./pages/other/About";
import Contact from "./pages/other/Contact";

function App(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json"),
        },
      })
    );
  });

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <BrowserRouter>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <div className="grid-container">
                <main className="main">
                  <div className="content">
                    <Route path="/orders" component={OrdersScreen} />
                    <Route path="/profile" component={ProfileScreen} />
                    <Route path="/order/:id" component={OrderScreen} />
                    <Route path="/products" component={ProductsScreen} />
                    <Route path="/shipping" component={ShippingScreen} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/compare" component={Compare} />
                    <Route path="/wishlist" component={Wishlist} />
                    <Route path="/payment" component={PaymentScreen} />
                    <Route path="/placeorder" component={PlaceOrderScreen} />
                    <Route path="/signin" component={SigninScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/product/:id" component={Product} />
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/category/:id" component={HomeScreen} />
                    <Route path="/" exact={true} component={HomeScreen} />
                  </div>
                </main>
                <footer className="footer">All right reserved.</footer>
              </div>
            </Suspense>
          </ScrollToTop>
        </BrowserRouter>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
}

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
