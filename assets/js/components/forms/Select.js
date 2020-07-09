import React from "react";

const Select = ({
  name,
  value,
  errorMessage = "",
  label,
  onChange,
  children,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id="customer"
        className={"form-control " + (errorMessage && "is-invalid")}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
      <p className="invalid-feedback">{errorMessage}</p>
    </div>
  );
};

export default Select;
