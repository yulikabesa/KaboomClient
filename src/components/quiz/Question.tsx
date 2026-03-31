import classes from "./Question.module.css";
import React from "react";

const Question: React.FC<{
  question: string;
  currentQuestion: number;
  questionCount: number;
  duration: number;
}> = (props) => {

  return (
    <>
      <div className={classes["question-count"]}>
        {props.currentQuestion} מתוך {props.questionCount}
      </div>
      <div className={classes["wrapper"]}>
        <div className={classes["content"]}>
          <p>{props.question}</p>
        </div>
      </div>
      {/* Progress bar */}
      <div
        key={props.duration} // 👈 forces restart each question
        className={classes["progress-bar-animated"]}
        style={{ animationDuration: `${props.duration}s` }}
      />
    </>
  );
};

export default Question;
