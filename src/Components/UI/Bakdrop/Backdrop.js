import React from "react";
import classes from "./BackDrop.module.scss";

const Backdrop = props => {
  return props.show ? (
    <div onClick={props.closeBackDrop} className={classes.BackDrop} />
  ) : null;
};

export default Backdrop;
