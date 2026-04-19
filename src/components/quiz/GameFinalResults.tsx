import React, { useEffect } from "react";
import Podium from "../projector/podium";
import classes from "./GameFinalResults.module.css";
import confetti from "canvas-confetti";

type result = {
  nickname: string;
  score: number;
  rank: number;
};

const GameFinalResults: React.FC<{
  results: result[];
}> = (props) => {
  const fireCannons = () => {
    confetti({
      particleCount: 300,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.9 },
    });
    confetti({
      particleCount: 300,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.9 },
    });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      fireCannons();
    }, 2500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className={classes["score-title"]}>ניקוד</div>
      <div className={classes["btn"]}>משחק חדש</div>
      <div className={classes["container"]}>
        <Podium
          name={props.results[2].nickname}
          points={props.results[2].score}
          rank={3}
        />
        <Podium
          name={props.results[0].nickname}
          points={props.results[0].score}
          rank={1}
        />
        <Podium
          name={props.results[1].nickname}
          points={props.results[1].score}
          rank={2}
        />
      </div>
      <div className={classes["lower-places-container"]}>
        {props.results.slice(3).map((ranknfo, index) => (
          <div className={classes["rank-div"]} key={index}>
            <div className={classes["right-side-items"]}>
              <span className={classes.bolder}>{index + 4}</span>
              <span>{ranknfo.nickname}</span>
            </div>
            <div className={classes["left-side-items"]}>
              <span className={classes.bolder}>{ranknfo.score}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GameFinalResults;
