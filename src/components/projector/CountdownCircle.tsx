import React, { useEffect, useState } from "react";

type Props = {
    duration: number; // in seconds
};

const CountdownCircle: React.FC<Props> = ({ duration }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    const radius = 50;
    const stroke = 6;

    const fillRadius = radius - stroke;        // smaller inner circle
    const ringRadius = radius - stroke / 2;    // where the stroke sits

    const circumference = 2 * Math.PI * ringRadius;

    useEffect(() => {
        if (timeLeft <= 0) return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    const progress = timeLeft / duration;
    const strokeDashoffset = circumference * (1 - progress);

    return (
        <div style={{ width: 120, height: 120, position: "relative" }}>
            <svg height={120} width={120}>
                {/* background circle */}
                <circle
                    fill="#523ECB"
                    r={fillRadius}
                    cx="60"
                    cy="60"
                />

                {/* animated circle */}
                <circle
                    stroke="white"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={ringRadius}
                    cx="60"
                    cy="60"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="butt"
                    style={{
                        transform: "rotate(-90deg)",
                        transformOrigin: "50% 50%",
                        transition: "stroke-dashoffset 1s linear"
                    }}
                />
            </svg>

            {/* text in center */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "4vmax",
                    fontWeight: "600",
                    color: "white"
                }}
            >
                {timeLeft}
            </div>
        </div>
    );
};

export default CountdownCircle;