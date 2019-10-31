import React, { Component } from "react";
import classes from "../Auth.module.scss";
import utilClasses from "../../../Util/Util.module.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/Actions/IndexAction";
import Loader from "../../../Components/UI/Loader/Loader";
import SomethingWentWrong from "../../../HOC/ErrorHandler/SomethingWentWrong";
import { reduxForm, Field, Form } from "redux-form";
import renderInput from "../../../Components/Redux-Form/Renderers/RenderInput";
import signUpValidations from "../../../Components/Redux-Form/Validators/SignUpValidations";
import asyncSignUpValidations from "../../../Components/Redux-Form/Validators/AsyncSignUpValidations";

// SIGNUP CLASS BASED COMPONENT...
class SignUp extends Component {
  state = {
    showHidePassword: false,
    showHideConfirmPassword: false
  };

  componentDidMount = () => {
    this.props.onClearAuthSignUpErrors();
  };

  componentDidUpdate = () => {
    if (this.state.showHidePassword) {
      setTimeout(() => {
        this.setState({ showHidePassword: false });
      }, 1000);
    }
    if (this.state.showHideConfirmPassword) {
      setTimeout(() => {
        this.setState({ showHideConfirmPassword: false });
      }, 1000);
    }
  };

  // SHOW OR HIDE PASSWORD FOR PASSWORD FIELD SIMPLE DOM METHOD ...
  showHidePassword = () => {
    let passwordElement = document.getElementById("password");
    if (passwordElement.type === "password") {
      passwordElement.type = "text";
      setTimeout(() => {
        passwordElement.type = "password";
      }, 1000);
    }
    this.setState(prevState => {
      return { showHidePassword: !prevState.showHidePassword };
    });
  };

  // SHOW OR HIDE PASSWORD FOR PASSWORD FIELD SIMPLE DOM METHOD ...
  showHideConfirmPassword = () => {
    let passwordElement = document.getElementById("confirmPassword");
    if (passwordElement.type === "password") {
      passwordElement.type = "text";
      setTimeout(() => {
        passwordElement.type = "password";
      }, 1000);
    } else {
      passwordElement.type = "password";
    }
    this.setState(prevState => {
      return { showHideConfirmPassword: !prevState.showHideConfirmPassword };
    });
  };

  somethingWentWrongCloseHandler = () => {
    this.props.onSomethingWentWrongClose();
  };

  //SIGNUP FORM SUBMIT HANDLER METHOD ...
  signUpFormSubmitHandler = formValues => {
    const userData = {
      userName: formValues.userName,
      email: formValues.email,
      mobileNumber: formValues.mobileNumber,
      password: formValues.password,
      confirmPassword: formValues.confirmPassword
    };

    // CALLING LOGIN METHOD IN REDUX STORE...
    this.props.onAuthSignUp(userData, this.props.history);
  };

  render() {
    const errors = { ...this.props.authSignUpErrors };

    if (this.props.authLoading) {
      return (
        // RENDERING LOADER ON SCREEN WHEN SIGN FORM IS SUBMITED UNTIL SUCCESS...
        <main className={`${classes.SignUp} ${utilClasses.Loader__Centered}`}>
          <Loader />
        </main>
      );
    }
    if (this.props.somethingWentWrong) {
      return (
        <SomethingWentWrong
          showModal={this.props.somethingWentWrong ? true : false}
          somethingWentWrong={this.props.somethingWentWrong}
          somethingWentWrongCloseHandler={this.somethingWentWrongCloseHandler}
        />
      );
    }
    return (
      <main className={classes.LogInAndSignUp}>
        <div className={classes.LogInAndSignUp_Header}>
          <h1 className={`${utilClasses.Primary__Heading}`}>Sign Up</h1>
          <p className={`${utilClasses.Paragraph}`}>
            Create your Shopping Master account
          </p>
        </div>
        <Form
          onSubmit={this.props.handleSubmit(this.signUpFormSubmitHandler)}
          className={`${classes.LogInAndSignUp_Form} ${
            utilClasses.Margin__Top_Medium
          }`}
        >
          <Field
            name="userName"
            info="User name must be in between 2 and 30 character."
            id="name"
            label="User Name"
            placeholder="User Name"
            error={errors.userNameIsNotValid}
            component={renderInput}
          />
          <Field
            name="email"
            id="email"
            type="email"
            info="Email address should contain '@' character."
            label="Email Address"
            error={errors.emailIsNotValid || errors.emailIsAlreadyExist}
            placeholder="Email Address"
            component={renderInput}
          />
          <Field
            name="mobileNumber"
            id="mobileNumber"
            label="Enter Mobile Number"
            error={errors.mobileNumberIsNotValid}
            placeholder="Enter Mobile Number"
            info="Give your mobile number so we can contact you."
            component={renderInput}
          />
          <Field
            name="password"
            info="Password must be in between 6 and 30 characters!"
            type="password"
            label="Password"
            id="password"
            error={errors.passwordIsNotValid || errors.passwordsAreNotMatch}
            placeholder="Password"
            component={renderInput}
            showHidePassword={this.state.showHidePassword}
            showHidePasswordFunc={this.showHidePassword}
          />
          <Field
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            error={
              errors.confirmPasswordIsNotValid || errors.passwordsAreNotMatch
            }
            placeholder="Confirm Password"
            component={renderInput}
            showHideConfirmPassword={this.state.showHideConfirmPassword}
            showHideConfirmPasswordFunc={this.showHideConfirmPassword}
          />
          <button
            type="submit"
            className={`${utilClasses.Button}`}
            style={{ marginBottom: "3rem" }}
            disabled={this.props.pristine || this.props.submitting}
          >
            SignUp
          </button>
        </Form>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    authLoading: state.authReducer.authLoading,
    authSignUpErrors: state.authReducer.authSignUpErrors,
    somethingWentWrong: state.authReducer.somethingWentWrong
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuthSignUp: (userData, history) =>
      dispatch(actions.authSignUp(userData, history)),
    onClearAuthSignUpErrors: () => dispatch(actions.clearAuthSignUpErrors()),
    onSomethingWentWrongClose: () =>
      dispatch(actions.authSomethingWentWrongCloseHandler())
  };
};

SignUp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

export default reduxForm({
  form: "signUpForm",
  validate: signUpValidations,
  asyncValidate: asyncSignUpValidations,
  asyncChangeFields: ["email"]
})(SignUp);
