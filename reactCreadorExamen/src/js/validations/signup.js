import Validator from "validator";
import isEmpty from "lodash/isEmpty";

export default function validateInput(data) {
  let errors = {};

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
