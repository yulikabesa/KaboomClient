import { type Dispatch, type SetStateAction } from "react";
import AnswerOptions from "../AnswerOptions";
import CountdownCircle from "../projector/CountdownCircle";
import classes from "./GameQuestion.module.css";
import BarIndicatorsList from "../projector/BarIndicatorsList";
import { useSocket } from "../../store/SocketContext";
import DoubleScore from "../projector/DoubleScore";
import Button from "../UI/Button";

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
  questionImage: string;
}> = (props) => {
  const socket = useSocket();
  const onClickHandler = () => {
    console.log("clicked results");
    props.setTimeLeft(0);
    if (!socket) return;
    socket.emit("game-event", {
      type: "end-question",
      payload: null,
    });
  };
  const moveToLeaderboard = () => {
    if (!socket) return;
    socket.emit("game-event", {
      type: "show-leaderboard",
      payload: null,
    });
  };
  return (
    <div className={classes["flex"]}>
      <div className={classes["top-container"]}>
        <div className={classes["question"]}>
          {props.question}
          {props.scoringWeight === 2 && (
            <DoubleScore className={classes["double-score"]} />
          )}
        </div>
        {props.showAnswer ? (
          <Button
            variant="white"
            className={classes["top-btn"]}
            onClick={moveToLeaderboard}
          >
            הבא
          </Button>
        ) : (
          <Button
            variant="white"
            className={classes["top-btn"]}
            onClick={onClickHandler}
          >
            קיצור זמנים
          </Button>
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
          <div className={classes.wrapper}>
            <div className={classes["players-answered-container"]}>
              <p className={classes["players-answered-num"]}>
                {props.playerAnsweredNum}
              </p>
              <p className={classes["players-answered-text"]}>ענו</p>
            </div>
          </div>
          {props.questionImage !== "" && (
            <img
              className={classes["question-img"]}
              src={props.questionImage}
              alt="imageee for question"
            />
          )}
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
        {...(props.showAnswer
          ? { correctAnswerIndex: props.correctAnswerIndex }
          : {})}
      />
    </div>
  );
};

export default GameQuestion;
