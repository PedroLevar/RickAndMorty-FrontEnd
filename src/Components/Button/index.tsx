import React from "react";
import "./style.css";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className="containerButton" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;