import React from "react";
import classes from "./BarIndicator.module.css";

type BarIndicatorProps = {
    value: number;
    maxValue?: number;
    color: string;
    Shape?: React.ReactNode;
    showCorrect?: boolean;
};

export const BarIndicator: React.FC<BarIndicatorProps> = ({
    value,
    maxValue = 10,
    color,
    Shape,
    showCorrect = false,
}) => {
    // const heightPercent = Math.min((value / maxValue) * 100, 100);

    const minHeightPercent = 18; // or whatever fits your bottom overlay
    const heightPercent = Math.max((value / maxValue) * 100, minHeightPercent);
    return (
        <div className={classes["bar-container"]}>
            <div
                className={classes["bar"]}
                style={{
                    height: `${heightPercent}%`,
                    backgroundColor: color,
                }}
            >
                <div className={classes["bar-bottom"]}>
                    {Shape && (
                        <div className={classes["shape-wrapper"]}>
                            {Shape}
                        </div>
                    )}

                    <span className={classes["value"]}>{value}</span>

                    <span
                        className={classes["check"]}
                        style={{ opacity: showCorrect ? 1 : 0 }}
                    >
                        ✓
                    </span>
                </div>
            </div>
        </div>
    );
};
