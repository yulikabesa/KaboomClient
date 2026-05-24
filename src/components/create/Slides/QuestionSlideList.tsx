import React from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import DraggableQuestionItem from "./DraggableQuestionItem";
import type { questionType } from "../../home/ProductsList";

type Props = {
  questions: questionType[];
  currentQuestionEdited: number;
  onSlideClick: (index: number) => void;
  onSlideCopyClick: () => void;
  onSlideDeleteClick: () => void;
  onDragEnd: (result: any) => void;
  onDragStart: (result: any) => void;
};

const QuestionSlideList: React.FC<Props> = ({
  questions,
  currentQuestionEdited,
  onSlideClick,
  onSlideCopyClick,
  onSlideDeleteClick,
  onDragEnd,
  onDragStart,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Droppable droppableId="questions-list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ width: "100%" }}
          >
            {questions.map((question, index) => (
              <DraggableQuestionItem
                key={question._id}
                question={question}
                index={index}
                isActive={currentQuestionEdited === index}
                onClick={() => onSlideClick(index)}
                onCopy={onSlideCopyClick}
                onDelete={onSlideDeleteClick}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default QuestionSlideList;
