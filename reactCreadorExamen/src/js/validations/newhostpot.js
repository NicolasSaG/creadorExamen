import Validator from "validator";
import isEmpty from "lodash/isEmpty";
//validacion de hotspot
export default function validateInput2(data) {
  let errors = {}; // aqui se guardan los errores encontrados

  if (Validator.isEmpty(data.interactionId)) {
    errors.interactionId = "interaction id is required";
  }
  if (Validator.isEmpty(data.text)) {
    errors.text = "question text is required";
  }
  if (Validator.isEmpty(data.hotspotInstanceName1)) {
    errors.hotspotInstanceName1 = "hotspot Instance Name1 is required";
  }
  if (Validator.isEmpty(data.hotspotInstanceName2)) {
    errors.hotspotInstanceName2 = "hotspot Instance Name 2 is required";
  }
  if (Validator.isEmpty(data.hotspotInstanceName3)) {
    errors.hotspotInstanceName3 = "hotspot Instance Name 3 is required";
  }
  if (Validator.isEmpty(data.hotspotInstanceName4)) {
    errors.hotspotInstanceName4 = "hotspot Instance Name 4 is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}
