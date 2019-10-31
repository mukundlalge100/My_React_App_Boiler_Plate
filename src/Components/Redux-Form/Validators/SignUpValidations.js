import validator from "validator";
import { isEmpty } from "../../../Util/Util";

const signUpValidations = ({
  email,
  userName,
  mobileNumber,
  password,
  confirmPassword
}) => {
  const errors = {};

  if (isEmpty(userName)) {
    errors.userName = "User Name field is required!";
  } else if (!validator.isLength(userName, { min: 2, max: 30 })) {
    errors.userName = "User Name must be in between 2 and 30 characters!";
  }
  if (isEmpty(mobileNumber)) {
    errors.mobileNumber = "Mobile number field is required!";
  } else if (!validator.isMobilePhone(mobileNumber, "en-IN")) {
    errors.mobileNumber = "Mobile Number is not valid";
  }
  if (isEmpty(email)) {
    errors.email = "Email field is required!";
  } else if (!validator.isEmail(email)) {
    errors.email = "Email is not valid,please enter valid email!";
  }
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
export default signUpValidations;
