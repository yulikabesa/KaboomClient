import React from "react";
import type { QuestionType } from "../../pages/Create";
import QuestionSlide from "./QuestionSlide";

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
          style={{
            width: "100%",
            color: "#6E6E6E",
            paddingTop: "2vh",
            paddingBottom: "2vh",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor:
              props.currentQuestionEdited === index ? "#ECF4FB" : "transparent",
          }}
          onClick={() => props.handleQuestionEditedChange(index)}
        >
          {index + 1} שאלה
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
      ))}
    </>
  );
};

export default QuestionSlideList;
