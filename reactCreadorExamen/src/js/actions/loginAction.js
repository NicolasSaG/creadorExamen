import axios from "axios";
import setAuthorizationToken from "./setAuthorizationToken";

export function setCurrentUser(user) {
  return {
    type: "current_user",
    user: user
  };
}

export function login(userData) {
  return dispatch => {
    return axios
      .post(
        "http://localhost:8080/creadorExamen/Login",
        { userData },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          }
        }
      )
      .then(res => {
        const token = res.data.username;
        localStorage.setItem("littleToken", token);
        dispatch(setCurrentUser(token));
      });
  };
}
