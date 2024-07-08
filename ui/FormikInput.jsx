import React from "react";
import { useTranslation } from "react-i18next";

const FormikInput = ({
  children,
  placeholder,
  type,
  classes,
  value,
  onChange,
  state,
  id,
  name,
}) => {
  const { t } = useTranslation();

  const base =
    " outline-none p-2 border rounded-md border-borde placeholder:text-placeholderText my-2 ";
  const styles = {
    small: base + "sm:w-[45%] w-[100%]",
    large: base + "sm:w-[95%] w-[100%]",
    textarea: base + "sm:w-[95%] w-[100%] min-h-[50px]",
    basic: base + "w-[100%]",
  };

  const className = styles[classes];

  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  if (classes === "textarea") {
    return (
      <textarea
        onChange={onChange}
        value={value}
        className={className}
        placeholder={placeholder}
        name={name}
        id={id}
      ></textarea>
    );
  }

  return (
    <input
      onChange={onChange}
      value={value}
      state={state}
      placeholder={placeholder}
      type={type}
      className={className}
      id={id}
      name={name}
    >
      {children}
    </input>
  );
};

export default FormikInput;
