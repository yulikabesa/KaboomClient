import React from "react";
import Diamond from "../../shapes/Diamond";
import Triangle from "../../shapes/Triangle";
import Square from "../../shapes/Square";
import Circle from "../../shapes/Circle";
import Pentagon from "../../shapes/Pentagon";
import UpsideDownTriangle from "../../shapes/UpsideDownTriangle";
import classes from "./AnswerOptionsInputList.module.css";

type Props = {
  onAnswerClick: (answerIndex: number) => void;
  onAnswerTextChange: (answerIndex: number, value: string) => void;
  answerTexts: string[];
  correctAnswerIndexes: number[];
};

const AnswerOptionsInputList: React.FC<Props> = ({
  onAnswerClick,
  onAnswerTextChange,
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

  const filledCount = answerTexts.filter(
    (text) => (text ?? "").trim() !== "",
  ).length;

  const enabledAnswersCount = Math.min(
    options.length,
    Math.max(2, filledCount % 2 === 0 ? filledCount + 2 : filledCount + 1),
  );

  return (
    <div className={classes.container}>
      {Array.from({ length: options.length }).map((_, i) => {
        const isCorrect = correctAnswerIndexes?.includes(i) || false;
        const isDisabledAnswerOption = i >= enabledAnswersCount;
        return (
          <div
            key={i}
            className={`${classes["answer-option"]}`}
            style={
              {
                "--bg-color": options[i].color,
                "--hover-color": options[i].colorOnHover,
                boxShadow: `0 3px 0 0 ${options[i].shadowColor}`,
                border: `1px solid ${options[i].shadowColor}`,
                filter: isDisabledAnswerOption
                  ? "brightness(0.65)"
                  : "brightness(1)",
              } as React.CSSProperties
            }
          >
            <span
              className={`${classes.resultSign} ${isCorrect && classes.correct} ${!isDisabledAnswerOption && answerTexts[i] !== "" && answerTexts[i] !== undefined && classes["hover-enabled"]}`}
              onClick={() => {
                if (
                  !isDisabledAnswerOption &&
                  answerTexts[i] !== "" &&
                  answerTexts[i] !== undefined
                )
                  onAnswerClick(i);
              }}
            />

            <div className={classes.contentRight}>
              {options[i].shape}
              <input
                id={`answer-${i}`}
                type="text"
                placeholder="תשובה"
                className={classes.answerText}
                value={answerTexts[i] ?? ""}
                disabled={isDisabledAnswerOption}
                onChange={(e) => onAnswerTextChange(i, e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnswerOptionsInputList;
