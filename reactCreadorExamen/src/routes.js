import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./App";
import Login from "./js/components/LogIn/LogInPage.jsx";
import Greetings from "./js/components/Greetings";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login} />
    <Route path="greetings" component={Greetings} />
  </Route>
);
