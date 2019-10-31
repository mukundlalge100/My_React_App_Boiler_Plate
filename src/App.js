import React, { Component, Suspense } from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "./Components/UI/Loader/Loader";
import classes from "./App.module.scss";

import PageNotFound from "./Components/PageNotFound/PageNotFound";

class App extends Component {
  render() {
    let routes;
    if (this.props.isAuthenticated) {
      routes = (
        // PRIVATE ROUTES ...
        <Switch>
          {/* ALL ROUTES ... */}
          <Route exact path="/pageNotFound" component={PageNotFound} />
          <Redirect exact to="/pageNotFound" />
        </Switch>
      );
    } else {
      routes = (
        // PUBLIC ROUTES ...
        <Switch>
          {/* ALL ROUTES ... */}
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
        ></Suspense>
        <h1>Hi How are you!!</h1>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
