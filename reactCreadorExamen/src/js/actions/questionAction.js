import axios from "axios";

export function sendQuestion(data) {
  return dispatch => {
    return axios
      .post(
        "http://localhost:8080/creadorExamen/CreateQuestion",
        { data },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          }
        }
      )
      .then(res => {
        console.log("pregunta creada");
      });
  };
}
