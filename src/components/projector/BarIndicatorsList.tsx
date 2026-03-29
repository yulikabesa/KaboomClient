import type React from "react";
import Circle from "../shapes/Circle";
import Diamond from "../shapes/Diamond";
import Pentagon from "../shapes/Pentagon";
import Square from "../shapes/Square";
import Triangle from "../shapes/Triangle";
import UpsideDownTriangle from "../shapes/UpsideDownTriangle";
import { BarIndicator } from "./BarIndicator";
import classes from './BarIndicatorsList.module.css';

const BarIndicatorsList: React.FC<{ answersCount: number; correctAnswerIndex: number; maxValue: number; values: number[] }> = (props) => {

    const options = [
        { color: "#E21B3C", shape: <Triangle /> },
        { color: "#1368CE", shape: <Diamond /> },
        { color: "#D89E00", shape: <Circle /> },
        { color: "#26890C", shape: <Square /> },
        { color: "#864CBF", shape: <UpsideDownTriangle /> },
        { color: "#0AA3A3", shape: <Pentagon /> },
    ];

    return (
        <div className={classes.container}>
            {Array.from({ length: props.answersCount }).map((_, i) => (
                <BarIndicator
                    key={i}
                    value={props.values[i]}
                    maxValue={props.maxValue}
                    color={options[i].color}
                    Shape={options[i].shape}
                    showCorrect={props.correctAnswerIndex === i}
                />
            ))}
        </div>
    );
}

export default BarIndicatorsList;
