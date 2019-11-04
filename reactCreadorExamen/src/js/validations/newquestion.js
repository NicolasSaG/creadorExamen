import Validator from "validator";
import isEmpty from "lodash/isEmpty";

//validacion del lado del cliente de los datos del formulario para crearpregunta
export default function validateInput(data) {
  let errors = {}; // aqui se guardan los errores encontrados

  if (Validator.isEmpty(data.username)) {
    errors.username = "interaction id is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "question text is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "question text is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
