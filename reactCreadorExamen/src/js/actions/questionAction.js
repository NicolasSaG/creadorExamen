import axios from "axios";

export function sendQuestion(data) {
  return dispatch => {
    return axios
      .post(
        "http://localhost:8080/CreateQuestion",
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
  const array = Object.values(data.files);
  for (let i = 0; i < 8; i++) {
    formData.append("file", array[i], array[i].name);
  }
  console.log("subiendo archivos...");
  return dispatch => {
    return axios
      .post("http://localhost:8080/ManageFilesDD", formData)
      .then(res => {
        console.log("archivos guardados en xml");
      });
  };
}

export function sendQuestionHotSpot(data) {
  return dispatch => {
    return axios
      .post(
        "http://localhost:8080/CreateHotSpotQuestion",
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
