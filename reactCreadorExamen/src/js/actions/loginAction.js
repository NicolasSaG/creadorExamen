import axios from "axios";
import setAuthorizationToken from "./setAuthorizationToken";

//asignar el usuario actual dado un usuario
export function setCurrentUser(user) {
  return {
    type: "current_user",
    user: user
  };
}

export function logout() {
  return dispatch => {
    //removemos el token de usuario logeado
    localStorage.removeItem("littleToken");
    //cambiamos el estado global de redux del usuario actual a vacio
    dispatch(setCurrentUser({}));
  };
}

export function login(userData) {
  return dispatch => {
    //enviar peticion post al servlet
    return axios
      .post(
        "http://localhost:8080/Login",
        { userData },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          }
        }
      )
      .then(res => {
        //creat token y guardarlo en almacenamiento local
        const token = res.data.username;
        localStorage.setItem("littleToken", token);
        //cambiar estado global al usuario que se acaba de loguear
        dispatch(setCurrentUser(token));
      });
  };
}
