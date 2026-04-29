import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import classes from "./Button.module.css";

interface ButtonProps extends PropsWithChildren {
  className?: string;
  style: "blue" | "white";
  to?: string;
}

const Button: React.FC<ButtonProps> = (props) => {
  return props.to ? (
    <Link
      className={`${classes["btn"]} ${props.style ? classes[`${props.style}-btn`] : ""} ${props.className ? classes[props.className] : ""}`}
      to={props.to}
    >
      {props.children}
    </Link>
  ) : (
    <div
      className={`${classes["btn"]} ${props.style ? classes[`${props.style}-btn`] : ""} ${props.className ? classes[props.className] : ""}`}
    >
      {props.children}
    </div>
  );
};

export default Button;
