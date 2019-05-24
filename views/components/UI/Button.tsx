import * as React from "react";
import classNames from "classnames";

interface IButtonProps {
  className?: string;
  type?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button = ({
  className = "",
  disabled = false,
  type = "button",
  onClick = () => {},
  children
}: IButtonProps) => (
  <button
    onClick={onClick}
    className={classNames(
      {
        button: true,
        "button-disabled": disabled,
        "button-primary": !disabled && !className
      },
      className
    )}
    type={type}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
