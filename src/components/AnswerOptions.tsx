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
};

const AnswerOptions: React.FC<Props> = ({
    answersCount,
    onAnswerClick,
    viewMode = "player",
    answerTexts = []
}) => {

    const options = [
        { color: "#1368CE", shape: <Diamond />, colorOnHover: "#0057BA" },
        { color: "#E21B3C", shape: <Triangle />, colorOnHover: "#CB002C" },
        { color: "#26890C", shape: <Square />, colorOnHover: "#007600" },
        { color: "#D89E00", shape: <Circle />, colorOnHover: "#C28B00" },
        { color: "#0AA3A3", shape: <Pentagon />, colorOnHover: "#099494ff" },
        { color: "#864CBF", shape: <UpsideDownTriangle />, colorOnHover: "#7845acff" }
    ];

    return (
        <div className={`${classes.container} ${classes[viewMode]}`}>
            {Array.from({ length: answersCount }).map((_, i) => (
                <div
                    key={i}
                    className={`${classes["answer-option"]} ${classes[viewMode]}`}
                    onClick={() => onAnswerClick(i)}
                    style={{
                        "--bg-color": options[i].color,
                        "--hover-color": options[i].colorOnHover
                    } as React.CSSProperties}
                >
                    {options[i].shape}
                    {viewMode === "projector" && (
                        <span className={classes.answerText}>{answerTexts[i]}</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default AnswerOptions;