import React from "react";
import { useTranslation } from "react-i18next";

const Input = ({
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
    textarea: base + "sm:w-[95%] w-[100%]",
    basic: base + "w-[100%]",
  };

  const className = styles[classes];

  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  if (classes == "textarea") {
    return (
      <textarea
        onChange={handleChange}
        value={value}
        className={className}
        placeholder={placeholder}
        id={id}
      ></textarea>
    );
  }

  return (
    <input
      onChange={handleChange}
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

export default Input;
