import React from "react";
import classes from "./Leaderboard.module.css";
import { useSocket } from "../../store/SocketContext";
import Button from "../UI/Button";

// דוגמא לשימוש:
{
  /* <Leaderboard
    rankingArray={[
        { nickname: 'נגה', score: 400, rankChange: 'UP' },
        { nickname: 'חתול', score: 300, rankChange: 'UNCHANGED' },
        { nickname: 'ברווז', score: 200, rankChange: 'UP' },
        { nickname: 'ציפור', score: 100, rankChange: 'DOWN' },
        { nickname: 'דובי', score: 70, rankChange: 'UNCHANGED' },
        { nickname: 'עכבר', score: 20, rankChange: 'UNCHANGED' },
    ]}
/> */
}

type Rank = {
  nickname: string;
  score: number;
  rankChange: number;
  // "UP" | "DOWN" | "UNCHANGED";
  // 1 | -1 | 0
};

const Leaderboard: React.FC<{ rankingArray: Rank[] }> = (props) => {
  const socket = useSocket();
  const moveToNextQuestion = () => {
    if (!socket) return;
    socket.emit("game-event", {
      type: "next-question",
      payload: null,
    });
  };
  return (
    <>
      <div className={classes["score-title"]}>ניקוד</div>
      <div className={classes["actions"]}>
        <Button variant="white" onClick={moveToNextQuestion}>
          הבא
        </Button>
      </div>
      <div className={classes["Leaderboard-container"]}>
        {props.rankingArray.map((item, index) => (
          <div key={index} className={classes["Leaderboard-line"]}>
            <div className={classes["right-side-items"]}>
              <span className={classes.bolder}>{index + 1}</span>
              <span>{item.nickname}</span>
            </div>
            <div className={classes["left-side-items"]}>
              <span className={classes.bolder}>{item.score}</span>
              <span
                className={`${item.rankChange === -1 ? classes.down : ""}`}
                style={{
                  color:
                    item.rankChange === 1
                      ? "#288906"
                      : item.rankChange === -1
                        ? "#E21B3C"
                        : "transparent",
                }}
              >
                ▲
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Leaderboard;
