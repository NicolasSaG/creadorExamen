import axios from "axios";

export function sendQuestion(data) {
  var formData = new FormData();
  console.log(data.file);
  formData.append("file", data.file);
  return dispatch => {
    return axios
      .post(
        "http://localhost:8080/CreateQuestion",
        { formData },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json"
          }
        }
      )
      .then(res => {
        console.log("pregunta drag n drop creada");
      });
  };
}

export function sendQuestionHotSpot(data) {
  return dispatch => {
    return axios
      .post(
        "http://localhost:8080/creadorExamen/CreateHotSpotQuestion",
        { data },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          }
        }
      )
      .then(res => {
        console.log("pregunta hotspot creada");
      });
  };
}
