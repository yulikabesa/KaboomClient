import type React from "react";
import classes from "./DoubleScore.module.css";

const DoubleScore: React.FC<{ className: string }> = (props) => {
  return (
    <div className={`${classes["two-times-scoring"]} ${props.className}`}>
      <div className={classes["two-times-text"]}>2X</div>
      <div className={classes["scoring-text"]}>ניקוד</div>
    </div>
  );
};

export default DoubleScore;
