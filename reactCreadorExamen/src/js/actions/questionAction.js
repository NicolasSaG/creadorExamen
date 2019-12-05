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
        console.log("pregunta drag n drop creada");
      });
  };
}

export function sendFilesDragDrop(data) {
  let formData = new FormData();
  formData.append("file", data.file, data.file.name);
  console.log("subiendo archivos...");
  return dispatch => {
    return axios
      .post("http://localhost:8080/creadorExamen/ManageFilesDD", formData)
      .then(res => {
        console.log("archivos guardados en xml");
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
