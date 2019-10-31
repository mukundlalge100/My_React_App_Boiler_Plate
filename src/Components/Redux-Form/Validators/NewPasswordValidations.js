import validator from "validator";
import { isEmpty } from "../../../Util/Util";

const newPasswordValidations = ({ password, confirmPassword }) => {
  const errors = {};

  if (isEmpty(password)) {
    errors.password = "Password field is required!";
  } else if (!validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be in between 6 and 30 characters!";
  }
  if (isEmpty(confirmPassword)) {
    errors.confirmPassword = "Confirm Password field is required!";
  }

  if (
    !isEmpty(confirmPassword) &&
    !isEmpty(password) &&
    !validator.equals(password, confirmPassword)
  ) {
    errors.confirmPassword = "Passwords must match!";
  }
  return errors;
};
export default newPasswordValidations;
