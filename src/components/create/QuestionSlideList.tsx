import React from "react";
import type { QuestionType } from "../../pages/Create";
import QuestionSlide from "./QuestionSlide";
import copyIcon from "../../assets/grayCopyIcon.svg";
import deleteIcon from "../../assets/grayDeleteIcon.svg";
import classes from "./QuestionSlideList.module.css";

const QuestionSlideList: React.FC<{
  questions: QuestionType[];
  currentQuestionEdited: number;
  handleQuestionEditedChange: (index: number) => void;
}> = (props) => {
  return (
    <>
      {props.questions.map((question: QuestionType, index) => (
        <div
          key={index}
          className={classes.container}
          style={{
            backgroundColor:
              props.currentQuestionEdited === index ? "#ECF4FB" : "transparent",
          }}
          onClick={() => props.handleQuestionEditedChange(index)}
        >
          <div className={classes["question-num"]}>{index + 1} שאלה</div>
          <div className={classes['icons-and-slide-container']}>
            <div className={classes["icons-container"]}>
              <img src={copyIcon} />
              <img src={deleteIcon} />
            </div>
            <QuestionSlide
              key={index}
              questionImage={question.questionImage}
              questionText={question.questionText}
              timeLimit={question.timeLimit}
              isCurrentlyEdited={
                props.currentQuestionEdited === index ? true : false
              }
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default QuestionSlideList;
