import React, { useEffect } from "react";
import classes from "./FinalRank.module.css";
import gold from "../../assets/gold.svg";
import silver from "../../assets/silver.svg";
import bronze from "../../assets/bronze.svg";
import rankPlace from "../../assets/rankPlace.svg";

const FinalRank: React.FC<{ currentRank: number; points: number }> = (
  props,
) => {
  const rankImgArray = [gold, silver, bronze];

  useEffect(() => {
    localStorage.removeItem("kaboom-pin-recovery");
    localStorage.removeItem("nickname");
  }, []);

  return (
    <div className={classes["container"]}>
      {props.currentRank <= 3 ? (
        <img
          className={classes["rank-img"]}
          src={rankImgArray[props.currentRank - 1]}
        />
      ) : (
        <div className={classes["rank-wrapper"]}>
          <img className={classes["rank-img"]} src={rankPlace} />
          <p className={classes["rank-num"]}>{props.currentRank}</p>
        </div>
      )}
      <div className={classes["rank-place"]}>
        <span className={classes["hyphen"]}> ---- </span>
        <span className={classes["place"]}>מקום {props.currentRank}</span>
        <span className={classes["hyphen"]}> ---- </span>
      </div>
      <div className={classes["points-container"]}>{props.points} נקודות</div>
    </div>
  );
};

export default FinalRank;
