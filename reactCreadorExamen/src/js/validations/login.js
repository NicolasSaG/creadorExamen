import Validator from "validator";
import isEmpty from "lodash/isEmpty";

//validacion del lado del cliente de los datos del formulario para iniciar sesion
export default function validateInput(data) {
  let errors = {}; // aqui se guardan los errores encontrados

  if (Validator.isEmpty(data.username)) {
    errors.username = "username is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "password is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
