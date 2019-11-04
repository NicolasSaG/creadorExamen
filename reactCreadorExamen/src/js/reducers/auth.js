import isEmpty from "lodash/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {}
};
//reducer para manejar la accion de autentificacion

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case "current_user":
      //si esta autentificado
      return {
        //enviar el user si esta auntenfiticado porque no esta vacio el objeto
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
};
