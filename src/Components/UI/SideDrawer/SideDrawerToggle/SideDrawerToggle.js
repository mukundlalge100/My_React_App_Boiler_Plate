import React from "react";
import classes from "./SideDrawerToggle.module.scss";

const SideDrawerToggle = props => {
  return (
    <div
      title="Menu"
      className={classes.SideDrawerToggle}
      onClick={props.sideDrawerToggle}
    >
      <div />
      <div />
      <div />
    </div>
  );
};
export default SideDrawerToggle;
