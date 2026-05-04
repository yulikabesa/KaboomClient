import classes from "./QuestionSlide.module.css";
import exampleToChange from "../../assets/kaboomBackground.png";
import type React from "react";
import SlideAnswerOptionsList from "./SlideAnswerOptionsList";

const QuestionSlide: React.FC<{
  questionText: string;
  timeLimit: number;
  questionImage: string;
  isCurrentlyEdited: boolean;
  answersCount: number;
  correctAnswerIndexes : number[];
}> = (props) => {
  return (
    <div
      className={classes.container}
      style={{
        backgroundColor: props.isCurrentlyEdited ? "#FFFFFF" : "#f2f2f2",
        border: props.isCurrentlyEdited ? "2px solid #3E6CC4" : "none",
      }}
    >
      <p className={classes.title}>{props.questionText || "\u00A0"}</p>
      <div className={classes["middle-items"]}>
        {props.questionImage !== "" && (
          <img src={exampleToChange} className={classes["question-image"]} />
        )}
        <div className={classes["question-time"]}>{props.timeLimit}</div>
      </div>
      <SlideAnswerOptionsList answersCount={props.answersCount} correctAnswerIndexes={props.correctAnswerIndexes} />
    </div>
  );
};

export default QuestionSlide;
