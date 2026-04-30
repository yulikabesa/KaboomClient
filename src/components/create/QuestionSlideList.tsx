import React from "react";
import type { QuestionType } from "../../pages/Create";
import QuestionSlide from "./QuestionSlide";
import copyIcon from "../../assets/grayCopyIcon.svg";
import deleteIcon from "../../assets/grayDeleteIcon.svg";
import classes from "./QuestionSlideList.module.css";

const QuestionSlideList: React.FC<{
  questions: QuestionType[];
  currentQuestionEdited: number;
  onSlideClick: (index: number) => void;
  onSlideCopyClick: (index: number) => void;
  onSlideDeleteClick: (index: number) => void;
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
          onClick={() => props.onSlideClick(index)}
        >
          <div className={classes["icons-and-slide-container"]}>
            <div className={classes["icons-and-number-container"]}>
              <div
                className={`${classes["question-num"]} ${classes["center-text"]}`}
              >
                {index + 1}
              </div>
              <div className={classes["icons-container"]}>
                <img
                  className={classes.icon}
                  src={copyIcon}
                  onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                    e.stopPropagation(); // stops onSlideClick from happening
                    props.onSlideCopyClick;
                  }}
                />
                <img
                  className={classes.icon}
                  src={deleteIcon}
                  onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                    e.stopPropagation(); // stops onSlideClick from happening
                    props.onSlideDeleteClick;
                  }}
                />
              </div>
            </div>
            <div className={classes["column-flex"]}>
              <div className={classes["question-num"]}>שאלה</div>
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
        </div>
      ))}
    </>
  );
};

export default QuestionSlideList;
