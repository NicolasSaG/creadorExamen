import axios from "axios";

//intento de agregar una cabecera de authorization
//no se usa actualmente
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `tw ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}
