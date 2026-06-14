import React from "react";
import { AnswersStyle } from "../../AnswerOptions";
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

  const filledCount = answerTexts.filter(
    (text) => (text ?? "").trim() !== "",
  ).length;

  const enabledAnswersCount = Math.min(
    AnswersStyle.length,
    Math.max(2, filledCount % 2 === 0 ? filledCount + 2 : filledCount + 1),
  );

  return (
    <div className={classes.container}>
      {Array.from({ length: AnswersStyle.length }).map((_, i) => {
        const isCorrect = correctAnswerIndexes?.includes(i) || false;
        const isDisabledAnswerOption = i >= enabledAnswersCount;
        return (
          <div
            key={i}
            className={`${classes["answer-option"]}`}
            style={
              {
                "--bg-color": AnswersStyle[i].color,
                "--hover-color": AnswersStyle[i].colorOnHover,
                boxShadow: `0 3px 0 0 ${AnswersStyle[i].shadowColor}`,
                border: `1px solid ${AnswersStyle[i].shadowColor}`,
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
              {AnswersStyle[i].shape}
              <input
                id={`answer-${i}`}
                type="text"
                placeholder="הוסף תשובה"
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
