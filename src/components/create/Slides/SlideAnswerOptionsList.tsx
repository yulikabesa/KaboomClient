import React from "react";
import classes from "./SlideAnswerOptionsList.module.css";

type Props = {
  answersCount: number;
  correctAnswerIndexes: number[]; // new prop for projector mode
};

const SlideAnswerOptionsList: React.FC<Props> = ({
  answersCount,
  correctAnswerIndexes,
}) => {
  return (
    <div className={`${classes.container}`}>
      {Array.from({ length: answersCount % 2 === 0 ? answersCount : answersCount + 1 }).map((_, i) => {
        const isCorrect = correctAnswerIndexes.includes(i);
        return (
          <div key={i} className={`${classes["answer-option"]}`}>
            {isCorrect && <div className={classes['green-circle']}></div>}
          </div>
        );
      })}
    </div>
  );
};

export default SlideAnswerOptionsList;
