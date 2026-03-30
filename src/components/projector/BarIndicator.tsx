import React, { useEffect, useState } from "react";
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
    const minHeightPercent = 21; // bottom overlay
    const targetHeightPercent = Math.max((value / maxValue) * 100, minHeightPercent);

    const [heightPercent, setHeightPercent] = useState(minHeightPercent);

    useEffect(() => {
        // Animate after mount
        const timer = setTimeout(() => {
            setHeightPercent(targetHeightPercent);
        }, 50); // small delay to trigger transition

        return () => clearTimeout(timer);
    }, [targetHeightPercent]);

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
                    {Shape &&
                        <div className={classes["shape-wrapper"]}>
                            {Shape}
                        </div>
                    }
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
