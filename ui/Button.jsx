import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, disabled, to, type, onClick }) => {
  const base =
    "py-1 px-10 rounded-sm font-medium flex items-center justify-center text-white ";
  const styles = {
    purpleButton: base + " bg-primary ",
    grayButton: base + " bg-gray ",
    cardBtn:
      "bg-[#E2E0F4] text-[#352C80] py-1 px-4 basis-64 rounded-sm font-medium flex items-center justify-center",
    cardBtn2:
      "bg-primary text-[#FFF] py-1 px-4 basis-64 rounded-sm font-medium flex items-center justify-center",
    homeTabBar: "text-[#848383] font-con   md:text-xl py-3",
    homeTabBarChange: "text-[#8D303A] font-con md:text-xl border-b py-3",
    purpleLarge: base + " w-full bg-primary",
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const className = styles[type];

  if (to)
    return (
      <Link to={to} onClick={handleClick} className={className}>
        {children}
      </Link>
    );
  if (onClick)
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={styles[type]}
      >
        {children}
      </button>
    );

  return (
    <button onClick={handleClick} disabled={disabled} className={className}>
      {children}
    </button>
  );
};

export default Button;
