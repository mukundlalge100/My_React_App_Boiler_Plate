import React from "react";
import PropTypes from "prop-types";
import classes from "./Input.module.scss";

// SVG'S COMPONENT...
import { ReactComponent as ViewPasswordSVG } from "../../assets/SVG/visibility.svg";
import { ReactComponent as HidePasswordSVG } from "../../assets/SVG/visibility_off.svg";

import InputLoader from "../UI/InputLoader/InputLoader";

// TEXT INPUT FUNCTIONAL COMPONENT...

const Input = props => {
  let showHidePasswordSVG;
  let showHideConfirmPasswordSVG;

  // RENDER SHOWHIDE PASSWORD SVG ..
  if (props.showHidePassword) {
    showHidePasswordSVG = (
      <ViewPasswordSVG className={classes.Input__ShowHidePasswordIcon} />
    );
  } else {
    showHidePasswordSVG = (
      <HidePasswordSVG className={classes.Input__ShowHidePasswordIcon} />
    );
  }

  if (props.showHideConfirmPassword) {
    showHideConfirmPasswordSVG = (
      <ViewPasswordSVG className={classes.Input__ShowHidePasswordIcon} />
    );
  } else {
    showHideConfirmPasswordSVG = (
      <HidePasswordSVG className={classes.Input__ShowHidePasswordIcon} />
    );
  }

  if (props.type === "checkbox") {
    return (
      <div className={`${classes.Input} ${classes.Input__CheckBox}`}>
        <input
          {...props.inputProps}
          name={props.name}
          type={props.type}
          id={props.id}
          checked={props.checked}
        />
        <label
          className={`${classes.Input__Label} ${classes.Input__Label_CheckBox}`}
        >
          {props.label}
        </label>
      </div>
    );
  }
  return (
    <div className={`${classes.Input}`}>
      <input
        {...props.inputProps}
        name={props.name}
        type={props.type}
        id={props.id}
        className={`${classes.Input__InputElement}  ${
          props.error || (props.syncError && props.touched)
            ? classes.Input__Invalid
            : ""
        } ${props.type === "file" ? classes.Input__FileInput : ""}`}
        placeholder={props.placeholder}
      />

      {props.id === "password" ? (
        <div onClick={props.showHidePasswordFunc}>{showHidePasswordSVG}</div>
      ) : null}

      {props.id === "confirmPassword" ? (
        <div onClick={props.showHideConfirmPasswordFunc}>
          {showHideConfirmPasswordSVG}
        </div>
      ) : null}

      <label className={classes.Input__Label}>{props.label}</label>

      {props.info ? (
        <small className={classes.Input__Text}>{props.info}</small>
      ) : null}

      {props.error || props.touched ? (
        <p className={classes.Input__IsInvalid}>
          {props.error || props.syncError}
        </p>
      ) : null}

      {props.asyncValidating ? <InputLoader /> : null}
    </div>
  );
};

Input.propTypes = {
  // REQUIRED PROPS...
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,

  // OPTIONAL PROPS...
  id: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  syncError: PropTypes.string,
  touched: PropTypes.bool,
  info: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  showHidePassword: PropTypes.bool,
  showHidePasswordFunc: PropTypes.func,
  showHideConfrimPassword: PropTypes.bool,
  showHideConfrimPasswordFunc: PropTypes.func
};
Input.defaultProps = {
  type: "text"
};
export default Input;
