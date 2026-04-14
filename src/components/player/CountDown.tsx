import type React from "react";
import { useEffect, useState } from "react";
import classes from "./CountDown.module.css";

const CountDown: React.FC<{ initialSeconds: number }> = (props) => {
  const [seconds, setSeconds] = useState(props.initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <div className={classes["wrapper"]}>
      <div className={classes["circle"]} />
      <div className={classes["label"]}>{seconds}</div>
    </div>
  );
};

export default CountDown;
