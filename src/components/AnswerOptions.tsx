import React from "react";
import Diamond from "./shapes/Diamond";
import Triangle from "./shapes/Triangle";
import Square from "./shapes/Square";
import Circle from "./shapes/Circle";
import Pentagon from "./shapes/Pentagon";
import UpsideDownTriangle from "./shapes/UpsideDownTriangle";
import classes from "./AnswerOptions.module.css";

type Props = {
  answersCount: number;
  onAnswerClick: (answerIndex: number) => void;
  viewMode?: "player" | "projector";
  answerOptions?: string[];
  correctAnswerIndexes?: number[]; // new prop for projector mode
};

export const AnswersStyle = [
  {
    color: "#1368CE",
    shape: <Diamond />,
    colorOnHover: "#0057BA",
    shadowColor: "#0F53A5",
  },
  {
    color: "#E21B3C",
    shape: <Triangle />,
    colorOnHover: "#CB002C",
    shadowColor: "#B51630",
  },
  {
    color: "#26890C",
    shape: <Square />,
    colorOnHover: "#007600",
    shadowColor: "#1E6E0A",
  },
  {
    color: "#D89E00",
    shape: <Circle />,
    colorOnHover: "#C28B00",
    shadowColor: "#AD7E00",
  },
  {
    color: "#0AA3A3",
    shape: <Pentagon />,
    colorOnHover: "#099494ff",
    shadowColor: "#088282",
  },
  {
    color: "#864CBF",
    shape: <UpsideDownTriangle />,
    colorOnHover: "#7845acff",
    shadowColor: "#6B3D99",
  },
];

const AnswerOptions: React.FC<Props> = ({
  answersCount,
  onAnswerClick,
  viewMode = "player",
  answerOptions = [],
  correctAnswerIndexes,
}) => {
  return (
    <div className={`${classes.container} ${classes[viewMode]}`}>
      {Array.from({ length: answersCount }).map((_, i) => {
        const isCorrect = correctAnswerIndexes?.includes(i);
        const showResult =
          viewMode === "projector" && correctAnswerIndexes !== undefined;
        return (
          <div
            key={i}
            className={`${classes["answer-option"]} ${classes[viewMode]} `}
            onClick={() => onAnswerClick(i)}
            style={
              {
                "--bg-color": AnswersStyle[i].color,
                "--hover-color": AnswersStyle[i].colorOnHover,
                boxShadow:
                  viewMode === "projector"
                    ? `0 3px 0 0 ${AnswersStyle[i].shadowColor}`
                    : "none",
                border:
                  viewMode === "projector"
                    ? `1px solid ${AnswersStyle[i].shadowColor}`
                    : "none",
                opacity: showResult && !isCorrect ? 0.7 : 1, // 70% for wrong answers
              } as React.CSSProperties
            }
          >
            {showResult && (
              <span className={classes.resultSign}>
                {isCorrect ? "✔" : "✖"}
              </span>
            )}
            {viewMode === "player" && AnswersStyle[i].shape}

            {viewMode === "projector" && (
              <div className={classes.contentRight}>
                {AnswersStyle[i].shape}
                <span className={classes.answerText}>{answerOptions[i]}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AnswerOptions;
