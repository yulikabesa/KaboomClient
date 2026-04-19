import React from "react";
import classes from "./Podium.module.css";
import bronze from "../../assets/bronze.svg";
import silver from "../../assets/silver.svg";
import gold from "../../assets/gold.svg";

const Podium: React.FC<{ name: string; rank: number; points: number }> = (
  props,
) => {
  let rankSymbol;
  switch (props.rank) {
    case 1:
      rankSymbol = gold;
      break;
    case 2:
      rankSymbol = silver;
      break;
    case 3:
      rankSymbol = bronze;
      break;
  }

  return (
    <div className={`${classes["container"]} ${classes[`container${props.rank}`]}`}>
      <div className={`${classes["name"]} ${props.rank === 1 && classes['first-place-width']}`}>{props.name}</div>
      <div
        className={`${classes["purple-rectangle"]} ${classes[`rank${props.rank}`]}`}
      >
        <img className={classes["rank"]} src={rankSymbol} alt="rank" />
        <p className={classes["points"]}>{props.points} </p>
      </div>
    </div>
  );
};

export default Podium;
