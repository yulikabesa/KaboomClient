import React from "react";
import QuestionSlide from "./QuestionSlide";
import copyIcon from "../../assets/grayCopyIcon.svg";
import deleteIcon from "../../assets/grayDeleteIcon.svg";
import classes from "./QuestionSlideList.module.css";
import type { questionType } from "../ProductsList";
import defaultCover from "../../assets/defaultCoverPhoto.png";

const QuestionSlideList: React.FC<{
  questions: questionType[];
  currentQuestionEdited: number;
  onSlideClick: (index: number) => void;
  onSlideCopyClick: () => void;
  onSlideDeleteClick: () => void;
}> = (props) => {
  return (
    <>
      {props.questions.map((question: questionType, index) => (
        <div
          key={index}
          className={classes.container}
          style={{
            backgroundColor:
              props.currentQuestionEdited === index ? "#ECF4FB" : "transparent",
          }}
          onClick={() => props.onSlideClick(index)}
        >
          <div className={classes["all-items-wrapper"]}>
            <div className={classes["icons-and-number-container"]}>
              <div
                className={`${classes["question-num"]} ${classes["center-text"]}`}
                style={{
                  color:
                    props.currentQuestionEdited === index ? "black" : "#6e6e6e",
                }}
              >
                {index + 1}
              </div>
              <div
                className={classes["icons-container"]}
                style={{
                  visibility:
                    props.currentQuestionEdited === index
                      ? "visible"
                      : "hidden",
                }}
              >
                <img
                  className={classes.icon}
                  src={copyIcon}
                  onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                    e.stopPropagation(); // stops onSlideClick from happening
                    props.onSlideCopyClick();
                  }}
                />
                <img
                  className={classes.icon}
                  src={deleteIcon}
                  onClick={(e: React.MouseEvent<HTMLImageElement>) => {
                    e.stopPropagation(); // stops onSlideClick from happening
                    props.onSlideDeleteClick();
                  }}
                />
              </div>
            </div>
            <div className={classes["question-and-slide-container"]}>
              <div
                className={classes["question-num"]}
                style={{
                  color:
                    props.currentQuestionEdited === index ? "black" : "#6e6e6e",
                }}
              >
                שאלה
              </div>
              <QuestionSlide
                key={index}
                questionImage={question.questionImage ?? defaultCover}
                questionText={question.questionText}
                timeLimit={question.timeLimit}
                isCurrentlyEdited={
                  props.currentQuestionEdited === index ? true : false
                }
                answersCount={question.answerOptions.length}
                correctAnswerIndexes={question.correctIndexes}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default QuestionSlideList;
