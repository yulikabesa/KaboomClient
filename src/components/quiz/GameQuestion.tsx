import { type Dispatch, type SetStateAction } from "react";
import AnswerOptions from "../AnswerOptions";
import CountdownCircle from "../projector/CountdownCircle";
import classes from "./GameQuestion.module.css";
import BarIndicatorsList from "../projector/BarIndicatorsList";
import { useSocket } from "../../store/SocketContext";
import DoubleScore from "../projector/DoubleScore";

const GameQuestion: React.FC<{
  question: string;
  playerAnsweredNum: number;
  timeLeft: number;
  setTimeLeft: Dispatch<SetStateAction<number>>;
  answerTexts: string[];
  duration: number;
  showAnswer: boolean;
  correctAnswerIndex: number;
  answerDistributionArrray: number[];
  scoringWeight: number;
}> = (props) => {
  const socket = useSocket();
  const onClickHandler = () => {
    console.log("clicked results");
    props.setTimeLeft(0);
    if (!socket) return;
    socket.emit("game-event", {
      type: "end-question",
      payload: {
        pin: JSON.parse(localStorage.getItem("lobby")!).gamePin,
      },
    });
  };
  const moveToLeaderboard = () => {
    if (!socket) return;
    socket.emit("game-event", {
      type: "show-leaderboard",
      payload: {
        pin: JSON.parse(localStorage.getItem("lobby")!).gamePin,
      },
    });
  };
  return (
    <>
      {props.scoringWeight === 2 && (
        <DoubleScore className={classes["double-score"]} />
      )}
      <div className={classes["top-container"]}>
        <div className={classes["question"]}>{props.question}</div>
        {props.showAnswer ? (
          <div
            className={classes["shorten-time-btn"]}
            onClick={moveToLeaderboard}
          >
            הבא
          </div>
        ) : (
          <div className={classes["shorten-time-btn"]} onClick={onClickHandler}>
            קיצור זמנים
          </div>
        )}
      </div>
      {props.showAnswer ? (
        <div className={classes["bar-indicators-wrapper"]}>
          <BarIndicatorsList
            answersCount={props.answerDistributionArrray.length}
            correctAnswerIndex={props.correctAnswerIndex}
            maxValue={Math.max(...props.answerDistributionArrray)}
            values={props.answerDistributionArrray}
          />
        </div>
      ) : (
        <div className={classes["answered-and-time-container"]}>
          <div className={classes["players-answered-container"]}>
            <p className={classes["players-answered-num"]}>
              {props.playerAnsweredNum}
            </p>
            <p className={classes["players-answered-text"]}>ענו</p>
          </div>
          <CountdownCircle
            duration={props.duration}
            timeLeft={props.timeLeft}
            setTimeLeft={props.setTimeLeft}
          />
        </div>
      )}
      <AnswerOptions
        viewMode="projector"
        answersCount={props.answerTexts.length}
        answerTexts={props.answerTexts}
        onAnswerClick={(i) => console.log(i)}
        {...(props.showAnswer ? { correctAnswerIndex: 1 } : {})}
      />
    </>
  );
};

export default GameQuestion;
