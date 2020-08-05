import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store";
import "./assets/scss/style.scss";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
