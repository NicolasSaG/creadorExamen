import Validator from "validator";
import isEmpty from "lodash/isEmpty";

//validacion del lado del cliente de los datos del formulario para crearpregunta
export default function validateInput(data) {
  let errors = {}; // aqui se guardan los errores encontrados

  if (Validator.isEmpty(data.interactionId)) {
    errors.interactionId = "interaction id is required";
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "question text is required";
  }
  if (Validator.isEmpty(data.dragObject1)) {
    errors.dragObject1 = "drag object 1 is required";
  }
  if (Validator.isEmpty(data.dragObject2)) {
    errors.dragObject2 = "drag object 2 is required";
  }
  if (Validator.isEmpty(data.dragObject3)) {
    errors.dragObject3 = "drag object 3 is required";
  }
  if (Validator.isEmpty(data.dragObject4)) {
    errors.dragObject4 = "drag object 4 is required";
  }
  if (Validator.isEmpty(data.targetObject1)) {
    errors.targetObject1 = "target object 1 is required";
  }
  if (Validator.isEmpty(data.targetObject2)) {
    errors.targetObject2 = "target object 2 is required";
  }
  if (Validator.isEmpty(data.targetObject3)) {
    errors.targetObject3 = "target object 3 is required";
  }
  if (Validator.isEmpty(data.targetObject4)) {
    errors.targetObject4 = "target object 4 is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
