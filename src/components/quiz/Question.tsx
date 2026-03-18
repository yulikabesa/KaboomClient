import React from "react";
import classes from "./Question.module.css";

const Question = () => {
  const question = "שאלה ממש ממש ממש ממש ממש ממש גדולה ארוכה ומשעממת את לפחות שתי שורות";
  const currentQuestion = 1;
  const questionCount = 12;
  
  return (
    <>
      <div className={classes["question-count"]}>
        {currentQuestion} מתוך {questionCount}
      </div>
      <div className={classes["wrapper"]}>
        <div className={classes["content"]}>
          <p>{question}</p>
        </div>
      </div>
    </>
  );
};

export default Question;
