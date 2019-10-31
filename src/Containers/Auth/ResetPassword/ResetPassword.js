import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./ResetPassword.module.scss";
import utilClasses from "../../../Util/Util.module.scss";
import { ReactComponent as Shopify } from "../../../assets/SVG/shopify.svg";
import * as actions from "../../../store/Actions/IndexAction";
import Loader from "../../../Components/UI/Loader/Loader";
import SomethingWentWrong from "../../../HOC/ErrorHandler/SomethingWentWrong";
import { reduxForm, Field, Form } from "redux-form";
import renderInput from "../../../Components/Redux-Form/Renderers/RenderInput";
import resetPasswordValidations from "../../../Components/Redux-Form/Validators/ResetPasswordValidations";
class ResetPassword extends Component {
  componentDidMount = () => {
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  somethingWentWrongCloseHandler = () => {
    this.props.onSomethingWentWrongClose();
  };

  //RESET PASSWORD FORM SUBMIT HANDLER METHOD ...
  resetPasswordFormSubmitHandler = formValues => {
    const userData = {
      email: formValues.email
    };
    // CALLING LOGIN METHOD IN REDUX STORE...
    this.props.onAuthResetPassword(userData, this.props.history);
  };
  render() {
    const errors = { ...this.props.authErrors };

    if (this.props.authLoading) {
      // RENDERING LOADER ON SCREEN WHEN LOGIN FORM IS SUBMITED UNTIL SUCCESS...
      return (
        <main className={classes.ResetPassword}>
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
      <main className={classes.ResetPassword}>
        <Shopify className={classes.ResetPassword_Icon} />
        <h2 className={utilClasses.Secondary__Heading}>Reset Password</h2>
        <Form
          onSubmit={this.props.handleSubmit(
            this.resetPasswordFormSubmitHandler
          )}
          className={`${classes.ResetPassword_Form}`}
        >
          <Field
            name="email"
            info="Email should contain '@' character!"
            type="email"
            label="Enter Your Email."
            id="email"
            component={renderInput}
            error={errors.emailIsNotValid}
            placeholder="Enter Your Email."
          />
          <button
            className={`${utilClasses.Button} ${
              classes.ResetPassword_Form__Button
            }`}
          >
            Reset Password
          </button>
        </Form>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    authLoading: state.authReducer.authLoading,
    somethingWentWrong: state.authReducer.somethingWentWrong,
    authErrors: state.authReducer.authErrors,
    isAuthenticated: state.authReducer.isAuthenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSomethingWentWrongClose: () =>
      dispatch(actions.authSomethingWentWrongCloseHandler()),
    onAuthResetPassword: (userData, history) =>
      dispatch(actions.authResetPassword(userData, history))
  };
};

ResetPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);

export default reduxForm({
  form: "resetPasswordForm",
  validate: resetPasswordValidations
})(ResetPassword);
