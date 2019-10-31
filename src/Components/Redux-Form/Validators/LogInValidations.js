import validator from "validator";
import { isEmpty } from "../../../Util/Util";

const logInValidations = ({ email, password }) => {
  const errors = {};
  if (isEmpty(email)) {
    errors.email = "Email is required!";
  } else if (!validator.isEmail(email)) {
    errors.email = "Email is not valid!";
  }

  if (isEmpty(password)) {
    errors.password = "Password is required!";
  } else if (!validator.isLength(password, { min: 6, max: 32 })) {
    errors.password = "Password should be between 6 to 32 characters";
  }
  return errors;
};
export default logInValidations;
