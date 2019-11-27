import axios from "axios";

export function sendExam(data) {
  let aux = {};
  aux.questions = data;

  return dispatch => {
    return axios
      .post(
        "http://localhost:8080/creadorExamen/CreateExam",
        { aux },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          }
        }
      )
      .then(res => {
        console.log("examen creado");
      });
  };
}
