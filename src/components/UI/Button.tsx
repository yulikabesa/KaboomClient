import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import classes from "./Button.module.css";

interface ButtonProps extends PropsWithChildren {
  onClick?: any;
  className?: string;
  variant: "blue" | "white" | "red";
  to?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  return props.to ? (
    <Link
      className={`${classes["btn"]} ${props.variant ? classes[`${props.variant}-btn`] : ""} ${props.className ? classes[props.className] : ""}`}
      to={props.to}
    >
      {props.children}
    </Link>
  ) : (
    <div onClick={props.onClick}
      className={`${classes["btn"]} ${props.variant ? classes[`${props.variant}-btn`] : ""} ${props.className ? classes[props.className] : ""}`}
    >
      {props.children}
    </div>
  );
};

export default Button;
