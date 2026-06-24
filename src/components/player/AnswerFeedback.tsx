import React from "react";
import classes from "./AnswerFeedback.module.css";

const AnswerFeedback: React.FC<{
  isCorrect: boolean;
  currentRank: number | null;
  rankAbove: string;
}> = (props) => {
  const title = props.isCorrect ? "תשובה נכונה" : "תשובה לא נכונה";
  const divClass = props.isCorrect ? classes.correct : classes.wrong;

  return (
    <div className={classes.centering}>
      <p className={classes.title}>{title}</p>
      <div className={divClass}>
      </div>
      {props.currentRank && (
        <p className={classes.text}>
          מקום {props.currentRank}{" "}
          {props.rankAbove && `אחרי ${props.rankAbove}`}
        </p>
      )}
    </div>
  );
};

export default AnswerFeedback;
