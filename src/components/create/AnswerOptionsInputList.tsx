import React from "react";
import Diamond from "../shapes/Diamond";
import Triangle from "../shapes/Triangle";
import Square from "../shapes/Square";
import Circle from "../shapes/Circle";
import Pentagon from "../shapes/Pentagon";
import UpsideDownTriangle from "../shapes/UpsideDownTriangle";
import classes from "./AnswerOptionsInputList.module.css";

type Props = {
  answersCount: number;
  onAnswerClick: (answerIndex: number) => void;
  answerTexts: string[];
  correctAnswerIndexes: number[];
};

const AnswerOptionsInputList: React.FC<Props> = ({
  answersCount,
  onAnswerClick,
  answerTexts,
  correctAnswerIndexes,
}) => {
  const options = [
    {
      color: "#E21B3C",
      shape: <Triangle />,
      colorOnHover: "#CB002C",
      shadowColor: "#B51630",
    },
    {
      color: "#1368CE",
      shape: <Diamond />,
      colorOnHover: "#0057BA",
      shadowColor: "#0F53A5",
    },
    {
      color: "#D89E00",
      shape: <Circle />,
      colorOnHover: "#C28B00",
      shadowColor: "#AD7E00",
    },
    {
      color: "#26890C",
      shape: <Square />,
      colorOnHover: "#007600",
      shadowColor: "#1E6E0A",
    },
    {
      color: "#864CBF",
      shape: <UpsideDownTriangle />,
      colorOnHover: "#7845acff",
      shadowColor: "#6B3D99",
    },
    {
      color: "#0AA3A3",
      shape: <Pentagon />,
      colorOnHover: "#099494ff",
      shadowColor: "#088282",
    },
  ];

  return (
    <div className={classes.container}>
      {Array.from({ length: answersCount }).map((_, i) => {
        const isCorrect = correctAnswerIndexes.includes(i);
        return (
          <div
            key={i}
            className={`${classes["answer-option"]}`}
            style={
              {
                "--bg-color": options[i].color,
                "--hover-color": options[i].colorOnHover,
                "box-shadow": `0 3px 0 0 ${options[i].shadowColor}`,
                border: `1px solid ${options[i].shadowColor}`,
                filter:
                  (answerTexts[i] ?? "") === "" && i > 1
                    ? "brightness(0.75)"
                    : "brightness(1)",
              } as React.CSSProperties
            }
          >
            <span
              className={`${classes.resultSign} ${isCorrect && classes.correct}`}
              onClick={() => onAnswerClick(i)}
            />

            <div className={classes.contentRight}>
              {options[i].shape}
              <input
                type="text"
                placeholder="תשובה"
                className={classes.answerText}
                value={answerTexts[i] ?? ""}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnswerOptionsInputList;
