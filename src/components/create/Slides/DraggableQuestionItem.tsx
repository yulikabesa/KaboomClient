import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import QuestionSlide from "./QuestionSlide";
import QuestionActions from "./QuestionActions";
import classes from "./QuestionSlideList.module.css";
import type { questionType } from "../../../types/quiz";

type Props = {
  question: questionType;
  index: number;
  isActive: boolean;
  onClick: () => void;
  onCopy: () => void;
  onDelete: () => void;
};

const DraggableQuestionItem: React.FC<Props> = ({
  question,
  index,
  isActive,
  onClick,
  onCopy,
  onDelete,
}) => {
  return (
    <Draggable
      draggableId={question._id}
      index={index}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes.container}
          style={{
            width: "100%",
            backgroundColor: isActive ? "#ECF4FB" : "transparent",
            ...provided.draggableProps.style,
          }}
          onClick={onClick}
        >
          <div className={classes["all-items-wrapper"]}>
            <QuestionActions
              index={index}
              isActive={isActive}
              onCopy={onCopy}
              onDelete={onDelete}
            />

            <div className={classes["question-and-slide-container"]}>
              <div
                className={classes["question-num"]}
                style={{
                  color: isActive ? "black" : "#6e6e6e",
                }}
              >
                שאלה
              </div>
              <QuestionSlide
                questionImage={question.questionImage?.image ?? ""}
                questionText={question.questionText}
                timeLimit={question.timeLimit}
                isCurrentlyEdited={isActive}
                answersCount={question.answerOptions.length}
                correctAnswerIndexes={question.correctIndexes}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableQuestionItem;
