import React from "react";
import QuestionSlide from "./QuestionSlide";
import copyIcon from "../../assets/grayCopyIcon.svg";
import deleteIcon from "../../assets/grayDeleteIcon.svg";
import classes from "./QuestionSlideList.module.css";
import type { questionType } from "../ProductsList";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const QuestionSlideList: React.FC<{
  questions: questionType[];
  currentQuestionEdited: number;
  onSlideClick: (index: number) => void;
  onSlideCopyClick: () => void;
  onSlideDeleteClick: () => void;
  onDragEnd: (result: any) => void;
}> = (props) => {
  return (
    <DragDropContext onDragEnd={props.onDragEnd}>
      <Droppable droppableId="questions-list">
        {(provided) => (
          <div
            style={{ width: "100%" }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {props.questions.map((question, index) => (
              <Draggable
                key={question._id}
                draggableId={question._id}
                index={index}
                isDragDisabled={props.currentQuestionEdited !== index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={classes.container}
                    style={{
                      backgroundColor:
                        props.currentQuestionEdited === index
                          ? "#ECF4FB"
                          : "transparent",
                      ...provided.draggableProps.style,
                    }}
                    onClick={() => props.onSlideClick(index)}
                  >
                    <div className={classes["all-items-wrapper"]}>
                      {/* LEFT SIDE (number + icons) */}
                      <div className={classes["icons-and-number-container"]}>
                        <div
                          className={`${classes["question-num"]} ${classes["center-text"]}`}
                          style={{
                            color:
                              props.currentQuestionEdited === index
                                ? "black"
                                : "#6e6e6e",
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
                            onClick={(e) => {
                              e.stopPropagation();
                              props.onSlideCopyClick();
                            }}
                          />

                          <img
                            className={classes.icon}
                            src={deleteIcon}
                            onClick={(e) => {
                              e.stopPropagation();
                              props.onSlideDeleteClick();
                            }}
                          />
                        </div>
                      </div>

                      {/* RIGHT SIDE */}
                      <div className={classes["question-and-slide-container"]}>
                        <div
                          className={classes["question-num"]}
                          style={{
                            color:
                              props.currentQuestionEdited === index
                                ? "black"
                                : "#6e6e6e",
                          }}
                        >
                          שאלה
                        </div>

                        <QuestionSlide
                          questionImage={question.questionImage ?? ""}
                          questionText={question.questionText}
                          timeLimit={question.timeLimit}
                          isCurrentlyEdited={
                            props.currentQuestionEdited === index
                          }
                          answersCount={question.answerOptions.length}
                          correctAnswerIndexes={question.correctIndexes}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default QuestionSlideList;
