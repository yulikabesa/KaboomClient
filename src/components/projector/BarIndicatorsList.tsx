import type React from "react";
import { BarIndicator } from "./BarIndicator";
import { AnswersStyle } from "../AnswerOptions";
import classes from "./BarIndicatorsList.module.css";

const BarIndicatorsList: React.FC<{
  answersCount: number;
  correctAnswerIndexes: number[];
  maxValue: number;
  values: number[];
}> = (props) => {
  return (
    <div className={classes.container}>
      {Array.from({ length: props.answersCount }).map((_, i) => (
        <BarIndicator
          key={i}
          value={props.values[i]}
          maxValue={props.maxValue}
          color={AnswersStyle[i].color}
          Shape={AnswersStyle[i].shape}
          showCorrect={props.correctAnswerIndexes.includes(i)}
        />
      ))}
    </div>
  );
};

export default BarIndicatorsList;
