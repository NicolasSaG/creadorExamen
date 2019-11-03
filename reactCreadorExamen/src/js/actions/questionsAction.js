import axios from "axios";

export default function getQuestions() {
  return dispatch => {
    return axios.get("http://localhost:8080/creadorExamen/QuestionsServlet");
  };
}
