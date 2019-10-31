import React, { Component, Suspense, lazy } from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "./Components/UI/Loader/Loader";
import Navbar from "./Containers/Layouts/Navbar/Navbar";
import Footer from "./Components/Layouts/Footer/Footer";
import * as actions from "./store/Actions/IndexAction";
//STYLLING IMPORTS
import classes from "./App.module.scss";

import PageNotFound from "./Components/PageNotFound/PageNotFound";

const LogIn = lazy(() => import("./Containers/Auth/LogIn/LogIn"));
const SignUp = lazy(() => import("./Containers/Auth/SignUp/SignUp"));
const NewPassword = lazy(() =>
  import("./Containers/Auth/NewPassword/NewPassword")
);

const ResetPassword = lazy(() =>
  import("./Containers/Auth/ResetPassword/ResetPassword")
);
// ASYNC LAZY COMPONENTS CHUNKS ...

class App extends Component {
  componentDidMount = () => {
    this.props.onAuthTryToLogIn(this.props.history);
  };
  render() {
    let routes;
    if (this.props.isAuthenticated) {
      routes = (
        // PRIVATE ROUTES ...
        <Switch>
          //ALL ROUTES ....
          <Route exact path="/pageNotFound" component={PageNotFound} />
          <Redirect exact to="/pageNotFound" />
        </Switch>
      );
    } else {
      routes = (
        // PUBLIC ROUTES ...
        <Switch>
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/reset-password/:token" component={NewPassword} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/pageNotFound" component={PageNotFound} />
          <Redirect exact to="/pageNotFound" />
        </Switch>
      );
    }
    return (
      <main className={classes.App}>
        <Suspense
          fallback={
            <div className={classes.App_Loader}>
              <Loader />
            </div>
          }
        >
          <Navbar />
          {routes}
          <Footer />
        </Suspense>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuthTryToLogIn: history => dispatch(actions.authCheckLogInState(history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
