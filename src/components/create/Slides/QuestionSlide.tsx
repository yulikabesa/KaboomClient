import classes from "./QuestionSlide.module.css";
import type React from "react";
import SlideAnswerOptionsList from "./SlideAnswerOptionsList";
import type { QuestionWarning } from "../../../types/quiz";
import { useRef, useState } from "react";
import ToolTip from "../../UI/ToolTip";

const QuestionSlide: React.FC<{
  questionText: string;
  timeLimit: number;
  questionImage: string;
  isCurrentlyEdited: boolean;
  answersCount: number;
  correctAnswerIndexes: number[];
  warning: QuestionWarning;
  isLoading: boolean;
}> = (props) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const warningRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className={`${classes.slide} ${props.isLoading ? classes.skeleton : ""}`}
      style={{
        backgroundColor: props.isCurrentlyEdited && !props.isLoading ? "#FFFFFF" : "#f2f2f2",
        border: props.isCurrentlyEdited && !props.isLoading ? "2px solid #3E6CC4" : "none",
      }}
    >
      <p className={classes.title}>{props.questionText || "\u00A0"}</p>
      <div className={classes["middle-items"]}>
        {props.questionImage !== "" && (
          <div className={classes["image-container"]}>
            <img
              src={props.questionImage}
              className={classes["question-image"]}
            />
          </div>
        )}
        <div className={classes["question-time"]}>{props.timeLimit}</div>
      </div>
      <SlideAnswerOptionsList
        answersCount={props.answersCount}
        correctAnswerIndexes={props.correctAnswerIndexes}
      />
      {props.warning.hasWarning && (
        <>
          <div
            ref={warningRef}
            className={classes["warning"]}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            !
          </div>
          {hovered && warningRef && (
            <ToolTip
              content={props.warning.messages.join("\n")}
              target={warningRef.current!}
              backgroundColor="#3a1182"
            />
          )}
        </>
      )}
    </div>
  );
};

export default QuestionSlide;
