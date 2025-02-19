import React from "react";

export const Button = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-primary-600 hover:bg-primary-700 text-white",
    secondary: "bg-gray-700/30 hover:bg-gray-700/50 text-primary-400",
    outline:
      "border border-primary-500 text-primary-500 hover:bg-primary-500/10",
  };

  return (
    <button
      className={`${commonStyles.buttonBase} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
