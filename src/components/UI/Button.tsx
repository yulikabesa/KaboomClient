import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import classes from "./Button.module.css";

interface ButtonProps extends PropsWithChildren {
  onClick?: any;
  className?: string;
  variant?: "blue" | "white" | "red" | "black";
  to?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = (props) => {
  return props.to ? (
    <Link
      className={`${classes["btn"]} ${props.variant ? classes[`${props.variant}-btn`] : ""} ${props.className ? props.className : ""}`}
      to={props.to}
    >
      {props.children}
    </Link>
  ) : (
    <button
      onClick={props.onClick}
      type={props.type}
      className={`${classes["btn"]} ${props.variant ? classes[`${props.variant}-btn`] : ""} ${props.className ? props.className : ""}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
