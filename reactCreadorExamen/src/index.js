import React from "react";
import { render } from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import { Router, browserHistory } from "react-router";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import routes from "./routes";
import rootReducer from "./rootReducer";
import { setCurrentUser } from "./js/actions/loginAction";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f
  )
);

if (localStorage.littleToken) {
  store.dispatch(setCurrentUser(localStorage.littleToken));
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById("root")
);
