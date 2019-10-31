import validator from "validator";
import { isEmpty } from "../../../Util/Util";

const resetPasswordValidations = ({ email }) => {
  const errors = {};
  if (isEmpty(email)) {
    errors.email = "Email is required!";
  } else if (!validator.isEmail(email)) {
    errors.email = "Email is not valid!";
  }
  return errors;
};
export default resetPasswordValidations;
