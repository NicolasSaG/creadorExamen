import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./App";
import Login from "./js/components/LogIn/LogInPage.jsx";
import Welcome from "./js/components/Welcome.js";
import Questions from "./js/components/Questions/Questions";
import requireAuth from "./js/components/authenticate/Authenticate";
import requireNoAuth from "./js/components/authenticate/NoAuthenticate";
import Question from "./js/components/Questions/Question";
import Type from "./js/components/Type/Type";
import HotSpot from "./js/components/Questions/HotSpot";
export default (
  //espeficacion de rutas de la aplicacion
  <Route path="/" component={App}>
    <IndexRoute component={requireNoAuth(Login)} />
    <Route path="welcome" component={requireAuth(Welcome)} />{" "}
    {/** componente compuesto para mostrar solo si ya se inicio sesion */}
    <Route path="questions" component={requireAuth(Questions)} />
    <Route path="newquestion" component={requireAuth(Question)} />
    <Route path="hotspot" component={requireAuth(HotSpot)} />
    <Route path="type" component={requireAuth(Type)} />

  </Route>
);
