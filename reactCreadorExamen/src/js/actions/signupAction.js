import axios from "axios";

export function userSignupRequest(userData) {
  alert(userData);
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
      .then(response => alert(response.data))
      .catch(err => console.log("err", err));
  };
}
