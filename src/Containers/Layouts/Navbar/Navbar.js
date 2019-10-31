import React, { Component } from "react";
import classes from "./Navbar.module.scss";
import SideDrawerToggle from "../../../Components/UI/SideDrawer/SideDrawerToggle/SideDrawerToggle";
import SideDrawer from "../../../Components/UI/SideDrawer/SideDrawer";
import { ReactComponent as SignUpSVG } from "../../../assets/SVG/sign-up-key.svg";
import { ReactComponent as LogInSVG } from "../../../assets/SVG/lock.svg";

import { ReactComponent as LogOutSVG } from "../../../assets/SVG/unlocked.svg";

class Navbar extends Component {
  state = {
    showHideSideDrawer: false
  };
  authLogOut = () => {
    this.sideDrawerCloseHandler();
    this.props.onAuthLogOut(this.props.history);
  };
  showHideSideDrawer = () => {
    this.setState(prevState => {
      return {
        showHideSideDrawer: !prevState.showHideSideDrawer
      };
    });
  };
  sideDrawerCloseHandler = () => {
    this.setState({ showHideSideDrawer: false });
  };
  render() {
    let conditionalRoutes;
    if (this.props.isAuthenticated) {
      conditionalRoutes = (
        <div className={classes.Navbar_Nav__LinkContainer}>
          <div className={classes.Navbar_Nav__Link} onClick={this.authLogOut}>
            <LogOutSVG className={classes.Navbar_Nav__NavbarSVG} />
            LogOut
          </div>
        </div>
      );
    } else {
      conditionalRoutes = (
        <div className={classes.Navbar_Nav__LinkContainer}>
          <Link
            className={classes.Navbar_Nav__Link}
            to="/signup"
            onClick={this.sideDrawerCloseHandler}
          >
            <SignUpSVG className={classes.Navbar_Nav__NavbarSVG} />
            SignUp
          </Link>

          <Link
            className={classes.Navbar_Nav__Link}
            to="/login"
            onClick={this.sideDrawerCloseHandler}
          >
            <LogInSVG className={classes.Navbar_Nav__NavbarSVG} />
            LogIn
          </Link>
        </div>
      );
    }
    return (
      <main className={classes.Navbar}>
        <SideDrawerToggle sideDrawerToggle={this.showHideSideDrawer} />

        {this.state.showHideSideDrawer ? (
          <SideDrawer
            showHideSideDrawer={this.state.showHideSideDrawer}
            sideDrawerClosedHandler={this.sideDrawerCloseHandler}
          >
            <nav
              className={`${classes.Navbar_Nav} ${
                classes.Navbar_Nav__SideDrawerShow
              }`}
            >
              // SOME LINKS AS PER REQUIREMENT ... 
              {conditionalRoutes}
            </nav>
          </SideDrawer>
        ) : (
          <nav
            className={`${classes.Navbar_Nav} ${
              classes.Navbar_Nav__SideDrawerHide
            }`}
            >
            //SOME LINKS AS PER REQUIREMENT...
            {conditionalRoutes}
          </nav>
        )}
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onAuthLogOut: history => dispatch(actions.authLogOut(history))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navbar));
