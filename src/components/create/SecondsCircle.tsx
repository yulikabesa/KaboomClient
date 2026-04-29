import type React from "react";
import classes from "./SecondsCircle.module.css";

const SecondsCircle: React.FC<{
  size: "big" | "small";
  seconds: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}> = (props) => {
  return (
    <div
      className={`${classes.circle} ${classes[props.size]} ${props.className || ""}`}
      style={props.style}
      onClick={props.onClick}
    >
      {props.seconds}
    </div>
  );
};

export default SecondsCircle;
