import Input from "../../Input/Input";
import React from "react";

const renderInput = fieldProps => {
  return (
    <Input
      name={fieldProps.input.name}
      inputProps={fieldProps.input}
      type={fieldProps.type}
      id={fieldProps.id}
      placeholder={fieldProps.placeholder}
      label={fieldProps.label}
      info={fieldProps.info}
      error={fieldProps.error}
      syncError={fieldProps.meta.error}
      asyncValidating={fieldProps.meta.asyncValidating}
      touched={fieldProps.meta.touched}
      warning={fieldProps.meta.warning}
      showHidePassword={fieldProps.showHidePassword}
      showHidePasswordFunc={fieldProps.showHidePasswordFunc}
      showHideConfirmPassword={fieldProps.showHideConfirmPassword}
      showHideConfirmPasswordFunc={fieldProps.showHideConfirmPasswordFunc}
    />
  );
};
export default renderInput;
