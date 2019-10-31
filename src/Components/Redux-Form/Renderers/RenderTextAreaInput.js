import TextAreaField from "../../Input/TextAreaField/TextAreaField";
import React from "react";

const renderTextAreaInput = fieldProps => {
  return (
    <TextAreaField
      name={fieldProps.input.name}
      inputProps={fieldProps.input}
      error={fieldProps.error}
      syncError={fieldProps.meta.error}
      touched={fieldProps.meta.touched}
      type={fieldProps.type}
      id={fieldProps.id}
      placeholder={fieldProps.placeholder}
      label={fieldProps.label}
      info={fieldProps.info}
    />
  );
};
export default renderTextAreaInput;
