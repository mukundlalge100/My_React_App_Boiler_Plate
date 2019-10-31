import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "../Auth.module.scss";
import utilClasses from "../../../Util/Util.module.scss";
import Loader from "../../../Components/UI/Loader/Loader";
import SomethingWentWrong from "../../../HOC/ErrorHandler/SomethingWentWrong";
import { ReactComponent as Shopify } from "../../../assets/SVG/shopify.svg";
import * as actions from "../../../store/Actions/IndexAction";
import { reduxForm, Field, Form } from "redux-form";
import RenderInput from "../../../Components/Redux-Form/Renderers/RenderInput";
import logInValidations from "../../../Components/Redux-Form/Validators/LogInValidations";

class LogIn extends Component {
  state = {
    showHidePassword: false
  };

  componentDidMount = () => {
    this.props.onClearAuthLogInErrors();
    // CHECK IF USER IS AUTHENTICATED OR NOT IF YES REDIRECT USER TO DASHBOARD FROM LOGIN...
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  };
  componentDidUpdate = () => {
    if (this.state.showHidePassword) {
      setTimeout(() => {
        this.setState({ showHidePassword: false });
      }, 1000);
    }
  };

  somethingWentWrongCloseHandler = () => {
    this.props.onSomethingWentWrongClose();
  };

  //LOGIN FORM SUBMIT HANDLER METHOD ...

  logInFormSubmitHandler = formValues => {
    const userData = {
      email: formValues.email,
      password: formValues.password
    };
    // CALLING LOGIN METHOD IN REDUX STORE...
    this.props.onAuthLogIn(userData, this.props.history);
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

  render() {
    const errors = { ...this.props.authLogInErrors };

    if (this.props.authLoading) {
      // RENDERING LOADER ON SCREEN WHEN LOGIN FORM IS SUBMITED UNTIL SUCCESS...
      return (
        <main className={utilClasses.Loader__Centered}>
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
        <Shopify className={classes.LogInAndSignUp_Icon} />
        <Form
          onSubmit={this.props.handleSubmit(this.logInFormSubmitHandler)}
          className={classes.LogInAndSignUp_Form}
        >
          <div className={classes.LogInAndSignUp_Form__HeaderContainer}>
            <h1
              className={`${utilClasses.Primary__Heading} ${
                utilClasses.Centered
              }`}
            >
              LogIn
            </h1>
          </div>
          <Field
            name="email"
            component={RenderInput}
            label="Enter Your Email"
            placeholder="Enter Your Email"
            type="text"
            id="email"
            info="Email address should contain '@' character."
            error={errors.emailIsNotValid || errors.emailIsNotExist}
          />
          <Field
            type="password"
            component={RenderInput}
            id="password"
            placeholder="Enter Your Password"
            name="password"
            label="Enter Your Password"
            error={errors.passwordIsNotValid}
            showHidePassword={this.state.showHidePassword}
            showHidePasswordFunc={this.showHidePassword}
          />
          <Link
            to="/reset-password"
            className={classes.LogInAndSignUp_Form__Link}
          >
            Forgot password?
          </Link>
          <button
            className={`${utilClasses.Button} ${
              classes.LogInAndSignUp_Form__Button
            }`}
            disabled={this.props.pristine || this.props.submitting}
          >
            LogIn
          </button>
        </Form>
        <p className={`${utilClasses.Paragraph}`}>
          Don't have an account?
          <Link to="/signup" className={classes.LogInAndSignUp_Form__Link}>
            Create account here.
          </Link>
        </p>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    authLoading: state.authReducer.authLoading,
    somethingWentWrong: state.authReducer.somethingWentWrong,
    authLogInErrors: state.authReducer.authLogInErrors,
    isAuthenticated: state.authReducer.isAuthenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuthLogIn: (userData, history) =>
      dispatch(actions.authLogIn(userData, history)),
    onClearAuthLogInErrors: () => dispatch(actions.clearAuthLogInErrors()),
    onSomethingWentWrongClose: () =>
      dispatch(actions.authSomethingWentWrongCloseHandler())
  };
};

LogIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);

export default reduxForm({ form: "logInForm", validate: logInValidations })(
  LogIn
);
