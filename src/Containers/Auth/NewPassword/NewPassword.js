import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./NewPassword.module.scss";
import utilClasses from "../../../Util/Util.module.scss";
import { ReactComponent as Shopify } from "../../../assets/SVG/shopify.svg";
import * as actions from "../../../store/Actions/IndexAction";
import Loader from "../../../Components/UI/Loader/Loader";
import SomethingWentWrong from "../../../HOC/ErrorHandler/SomethingWentWrong";
import { reduxForm, Field, Form } from "redux-form";
import renderInput from "../../../Components/Redux-Form/Renderers/RenderInput";
import newPasswordValidations from "../../../Components/Redux-Form/Validators/NewPasswordValidations";
class NewPassword extends Component {
  state = {
    showHidePassword: false,
    showHideConfirmPassword: false
  };

  componentDidMount = () => {
    if (this.props.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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

  //LOGIN FORM SUBMIT HANDLER METHOD ...
  newPasswordFormSubmitHandler = formValues => {
    const userData = {
      password: formValues.password,
      confirmPassword: formValues.confirmPassword
    };
    // CALLING LOGIN METHOD IN REDUX STORE...
    const token = this.props.match.params.token;

    this.props.onAuthNewPassword(userData, token, this.props.history);
  };

  render() {
    const errors = { ...this.props.authErrors };

    if (this.props.authLoading) {
      // RENDERING LOADER ON SCREEN WHEN LOGIN FORM IS SUBMITED UNTIL SUCCESS...
      return (
        <main className={classes.NewPassword}>
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
      <main className={classes.NewPassword}>
        <Shopify className={classes.NewPassword_Icon} />
        <h2 className={utilClasses.Secondary__Heading}>Update Password</h2>
        <Form
          onSubmit={this.props.handleSubmit(this.newPasswordFormSubmitHandler)}
          className={`${classes.NewPassword_Form}`}
        >
          <Field
            name="password"
            info="Password must be in between 6 and 30 characters!"
            type="password"
            label="Password"
            id="password"
            error={errors.passwordIsNotValid}
            placeholder="Password"
            component={renderInput}
            showHidePassword={this.state.showHidePassword}
            showHidePasswordFunc={this.showHidePassword}
          />
          <Field
            component={renderInput}
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            label="Confirm Password"
            error={errors.confirmPasswordIsNotValid}
            placeholder="Confirm Password"
            showHideConfirmPassword={this.state.showHideConfirmPassword}
            showHideConfirmPasswordFunc={this.showHideConfirmPassword}
          />
          <button
            className={`${utilClasses.Button} ${
              classes.NewPassword_Form__Button
            }`}
          >
            Update Password
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
    onAuthNewPassword: (userData, token, history) =>
      dispatch(actions.authNewPassword(userData, token, history))
  };
};

NewPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPassword);

export default reduxForm({
  form: "newPasswordForm",
  validate: newPasswordValidations
})(NewPassword);
