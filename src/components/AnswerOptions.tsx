import React from 'react';
import Diamond from './shapes/Diamond';
import Triangle from './shapes/Triangle';
import Square from './shapes/Square';
import Circle from './shapes/Circle';
import Pentagon from './shapes/Pentagon';
import UpsideDownTriangle from './shapes/UpsideDownTriangle';
import classes from './AnswerOptions.module.css';

type Props = {
    answersCount: number;
    onAnswerClick: (answerIndex: number) => void;
    viewMode?: "player" | "projector";
    answerTexts?: string[];
    correctAnswerIndex?: number; // new prop for projector mode
};

const AnswerOptions: React.FC<Props> = ({
    answersCount,
    onAnswerClick,
    viewMode = "player",
    answerTexts = [],
    correctAnswerIndex
}) => {

    const options = [
        { color: "#E21B3C", shape: <Triangle />, colorOnHover: "#CB002C" },
        { color: "#1368CE", shape: <Diamond />, colorOnHover: "#0057BA" },
        { color: "#D89E00", shape: <Circle />, colorOnHover: "#C28B00" },
        { color: "#26890C", shape: <Square />, colorOnHover: "#007600" },
        { color: "#864CBF", shape: <UpsideDownTriangle />, colorOnHover: "#7845acff" },
        { color: "#0AA3A3", shape: <Pentagon />, colorOnHover: "#099494ff" },
    ];

    return (
        <div className={`${classes.container} ${classes[viewMode]}`}>
            {Array.from({ length: answersCount }).map((_, i) => {
                const isCorrect = correctAnswerIndex === i;
                const showResult = viewMode === "projector" && correctAnswerIndex !== undefined;
                return (<div
                    key={i}
                    className={`${classes["answer-option"]} ${classes[viewMode]} `}
                    onClick={() => onAnswerClick(i)}
                    style={{
                        "--bg-color": options[i].color,
                        "--hover-color": options[i].colorOnHover,
                        opacity: showResult && !isCorrect ? 0.7 : 1, // 70% for wrong answers
                    } as React.CSSProperties}
                >
                    {showResult && (
                        <span className={classes.resultSign}>
                            {isCorrect ? "✔" : "✖"}
                        </span>
                    )}
                    {viewMode === "player" && options[i].shape}

                    {viewMode === "projector" && (
                        <div className={classes.contentRight}>
                            {options[i].shape}
                            <span className={classes.answerText}>{answerTexts[i]}</span>
                        </div>
                    )}
                </div>)
            })}
        </div>
    );
};

export default AnswerOptions;