import React from "react";
import correctSymbol from "../../assets/correct.svg";
import mistakeSymbol from "../../assets/mistake.svg";
import classes from "./AnswerFeedback.module.css";

const AnswerFeedback: React.FC<{
  isCorrect: boolean;
  currentRank: number | null;
  rankAbove: string;
}> = (props) => {
  const title = props.isCorrect ? "תשובה נכונה" : "תשובה לא נכונה";
  const symbol = props.isCorrect ? correctSymbol : mistakeSymbol;
  const divClass = props.isCorrect ? classes.correct : classes.mistaken;

  return (
    <div className={classes.centering}>
      <p className={classes.title}>{title}</p>
      <div className={divClass}>
        <img className={classes.symbol} src={symbol} alt={title} />
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
