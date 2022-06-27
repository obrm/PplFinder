import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "AppRouter";
import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.querySelector("#root")
);
