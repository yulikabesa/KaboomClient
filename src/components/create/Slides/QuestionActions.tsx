import React from "react";
import copyIcon from "../../../assets/grayCopyIcon.svg";
import deleteIcon from "../../../assets/grayDeleteIcon.svg";
import classes from "./QuestionSlideList.module.css";
import { useQuizLoading } from "../../../store/QuizLoadingContext";

type Props = {
  index: number;
  isActive: boolean;
  onCopy: () => void;
  onDelete: () => void;
};

const QuestionActions: React.FC<Props> = ({
  index,
  isActive,
  onCopy,
  onDelete,
}) => {
  const isLoading = useQuizLoading();
  return (
    <div className={classes["icons-and-number-container"]}>
      <div
        className={`${classes["question-num"]} ${classes["center-text"]}`}
        style={{
          color: isActive && !isLoading ? "black" : "#6e6e6e",
        }}
      >
        {index + 1}
      </div>
      <div
        className={classes["icons-container"]}
        style={{
          visibility: isActive ? "visible" : "hidden",
        }}
      >
        <img
          className={classes.icon}
          src={copyIcon}
          onClick={(e) => {
            e.stopPropagation();
            onCopy();
          }}
        />
        <img
          className={classes.icon}
          src={deleteIcon}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      </div>
    </div>
  );
};

export default QuestionActions;
