import React from "react";
import PropTypes from "prop-types";
import classes from "../Input.module.scss";

// SELECT INPUT FUNCTIONAL COMPONENT...
const SelectField = ({
  label,
  placeholder,
  error,
  value,
  onChange,
  name,
  info,
  options
}) => {
  // SELECT OPTIONS FOR SELECT ELEMENT ...
  const selectOptions = options.map(option => {
    return (
      <option value={option.value} key={option.label}>
        {option.label}
      </option>
    );
  });
  return (
    <div className={`${classes.Input}`}>
      <select
        className={`${classes.Input__InputElement}  ${
          error ? classes.Input__Invalid : ""
        }`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>

      <label className={classes.Input__Label}>{label}</label>

      {info ? <small className={classes.Input__Text}>{info}</small> : null}

      {error ? <p className={classes.Input__IsInvalid}>{error}</p> : null}
    </div>
  );
};

SelectField.propTypes = {
  // REQUIRED PROPS ...
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,

  // OPTIONAL...
  error: PropTypes.string,
  info: PropTypes.string
};
export default SelectField;
