import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./App";
import Login from "./js/components/LogIn/LogInPage.jsx";
import Welcome from "./js/components/Welcome.js";
import Questions from "./js/components/Questions/Questions";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login} />
    <Route path="welcome" component={Welcome} />
    <Route path="questions" component={Questions} />
  </Route>
);
