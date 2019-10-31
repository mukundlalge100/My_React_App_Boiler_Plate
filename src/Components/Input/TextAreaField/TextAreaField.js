import React from "react";
import PropTypes from "prop-types";
import classes from "../Input.module.scss";

// TEXTAREA INPUT FUNCTIONAL COMPONENT...
const TextAreaField = ({
  label,
  placeholder,
  error,
  inputProps,
  name,
  info,
  syncError,
  touched
}) => {
  return (
    <div className={`${classes.Input}`}>
      <textarea
        className={`${classes.Input__InputElement}  ${
          error || (syncError && touched) ? classes.Input__Invalid : ""
        }`}
        placeholder={placeholder}
        name={name}
        {...inputProps}
      />
      <label className={classes.Input__Label}>{label}</label>

      {info ? <small className={classes.Input__Text}>{info}</small> : null}

      {error || (syncError && touched) ? (
        <p className={classes.Input__IsInvalid}>{error || syncError}</p>
      ) : null}
    </div>
  );
};

TextAreaField.propTypes = {
  // REQUIRED PROPS...
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,

  // OPTIONAL PROPS...
  error: PropTypes.string,
  info: PropTypes.string
};

export default TextAreaField;
