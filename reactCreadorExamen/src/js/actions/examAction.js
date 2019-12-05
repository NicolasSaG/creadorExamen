import axios from "axios";

export function sendExam(data, name, id) {
  let aux = {};
  aux.questions = data;
  aux.name = name;
  aux.id = id;
  return dispatch => {
    return axios
      .post(
        "http://localhost:8080/CreateExam",
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
