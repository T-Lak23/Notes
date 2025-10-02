import React from "react";

const ButtonAuth = ({ children, disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="bg-primary disabled:bg-secondary-foreground disabled:cursor-not-allowed rounded-lg cursor-pointer text-primary-foreground font-medium flex items-center gap-2 px-4 py-3 justify-center"
    >
      {children}
    </button>
  );
};

export default ButtonAuth;
