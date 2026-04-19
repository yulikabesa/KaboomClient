import React, { useEffect, useState } from "react";
import Podium from "../projector/podium";
import classes from "./GameFinalResults.module.css";
import confetti from 'canvas-confetti';

type result = {
  name: string;
  points: number;
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
          name={props.results[2].name}
          points={props.results[2].points}
          rank={props.results[2].rank}
        />
        <Podium
          name={props.results[0].name}
          points={props.results[0].points}
          rank={props.results[0].rank}
        />
        <Podium
          name={props.results[1].name}
          points={props.results[1].points}
          rank={props.results[1].rank}
        />
      </div>
    </>
  );
};

export default GameFinalResults;
