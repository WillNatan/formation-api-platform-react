import React from "react";



const Field = ({
  name,
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  errorMessage = "",
}) => 
   (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className={"form-control" + (errorMessage && " is-invalid")}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        name={name}
        id={name}
      />
      {errorMessage && <p className="invalid-feedback">{errorMessage}</p>}
    </div>
  );

export default Field;
