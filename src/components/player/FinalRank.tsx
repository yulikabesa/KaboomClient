import React from "react";
import classes from "./FinalRank.module.css";
import gold from "../../assets/gold.svg";
import silver from "../../assets/silver.svg";
import bronze from "../../assets/bronze.svg";
import forth from "../../assets/4th.svg";

const FinalRank: React.FC<{ currentRank: number }> = (props) => {
  const rankImgArray = [gold, silver, bronze, forth];
  return (
    <div className={classes["container"]}>
      {props.currentRank <= 4 && <img src={rankImgArray[props.currentRank]} />}
      <div className={classes["rank-place"]}>
        <span className={classes["hyphen"]}> ---- </span>
        <span className={classes["place"]}>מקום {props.currentRank}</span>
        <span className={classes["hyphen"]}> ---- </span>
      </div>
      <div className={classes["points-container"]}></div>
    </div>
  );
};

export default FinalRank;
