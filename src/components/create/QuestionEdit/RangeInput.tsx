import React from "react";
import classes from "./RangeInput.module.css";

const RangeInput: React.FC<{
  scoringWeight: number;
  handleQuestionScoringWeightChange: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}> = (props) => {
  const scoringWeightOptions = [0.5, 1, 2];
  return (
    <div
      className={classes["slider-wrap"]}
      style={
        {
          "--index": scoringWeightOptions.indexOf(props.scoringWeight),
        } as React.CSSProperties
      }
    >
      <input
        id="question-scoring-weight"
        type="range"
        className={classes["input-range"]}
        min={0}
        max={scoringWeightOptions.length - 1}
        step={1}
        value={scoringWeightOptions.indexOf(props.scoringWeight)}
        onChange={props.handleQuestionScoringWeightChange}
      />
      <div className={classes["range-thumb-label"]}>X{props.scoringWeight}</div>
    </div>
  );
};

export default RangeInput;
