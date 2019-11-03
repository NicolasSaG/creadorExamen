import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./App";
import Login from "./js/components/LogIn/LogInPage.jsx";
import Welcome from "./js/components/Welcome.js";
import Questions from "./js/components/Questions/Questions";
import requireAuth from "./js/components/authenticate/Authenticate";
import requireNoAuth from "./js/components/authenticate/NoAuthenticate";
export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireNoAuth(Login)} />
    <Route path="welcome" component={requireAuth(Welcome)} />
    <Route path="questions" component={requireAuth(Questions)} />
  </Route>
);
