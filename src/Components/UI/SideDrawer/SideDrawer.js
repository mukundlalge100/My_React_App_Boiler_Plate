import React from "react";
import classes from "./SideDrawer.module.scss";
import Aux from "../../../HOC/Auxiliary/Auxiliary";
import BackDrop from "../../UI/Bakdrop/Backdrop";

const SideDrawer = props => {
  let showHideSideDrawer = [classes.SideDrawer, classes.Close].join(" ");

  if (props.showHideSideDrawer) {
    showHideSideDrawer = [classes.SideDrawer, classes.Open].join(" ");
  }
  return (
    <Aux>
      <BackDrop
        show={props.showHideSideDrawer}
        closeBackDrop={props.sideDrawerClosedHandler}
      />
      <div className={showHideSideDrawer}>{props.children}</div>
    </Aux>
  );
};
export default SideDrawer;
