import classes from "./QuestionSlide.module.css";
import type React from "react";
import SlideAnswerOptionsList from "./SlideAnswerOptionsList";

const QuestionSlide: React.FC<{
  questionText: string;
  timeLimit: number;
  questionImage: string;
  isCurrentlyEdited: boolean;
  answersCount: number;
  correctAnswerIndexes: number[];
  warning?: string;
}> = (props) => {
  return (
    <div
      className={classes.slide}
      style={{
        backgroundColor: props.isCurrentlyEdited ? "#FFFFFF" : "#f2f2f2",
        border: props.isCurrentlyEdited ? "2px solid #3E6CC4" : "none",
      }}
    >
      {props.warning && <div className={classes["warning"]}>!</div>}
      <p className={classes.title}>{props.questionText || "\u00A0"}</p>
      <div className={classes["middle-items"]}>
        {props.questionImage !== "" && (
          <div className={classes["image-container"]}>
            <img
              src={props.questionImage}
              className={classes["question-image"]}
            />
          </div>
        )}
        <div className={classes["question-time"]}>{props.timeLimit}</div>
      </div>
      <SlideAnswerOptionsList
        answersCount={props.answersCount}
        correctAnswerIndexes={props.correctAnswerIndexes}
      />
    </div>
  );
};

export default QuestionSlide;
