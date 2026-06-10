import PlayerCard from "../../components/player/PlayerCard";
import AnswerOptions from "../../components/AnswerOptions";
import { useEffect, useState } from "react";
import Loading from "../../components/player/Loading";
import AnswerFeedback from "../../components/player/AnswerFeedback";
import WaitingForHost from "../../components/player/WaitingForHost";
import { useSocket } from "../../store/SocketContext";
import CountDown from "../../components/player/CountDown";
import FinalRank from "../../components/player/FinalRank";
import classes from "./JoinGamePage.module.css";

type GameStatus =
  | "lobby"
  | "question"
  | "answers"
  | "loading"
  | "answerFeedback"
  | "podium";

const PlayerGamePage = () => {
  const [status, setStatus] = useState<GameStatus>("loading");
  const [isCorrect, setIsCorrect] = useState(false);
  const [answersCount, setAnswersCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [currentRank, setCurrentRank] = useState(0);

  const socket = useSocket();
  const handleAnswerClick = (answerIndex: number) => {
    setStatus("loading");
    socket.emit("game-event", {
      type: "submit-answer",
      payload: {
        answer: [answerIndex],
      },
    });
  };
  useEffect(() => {
    if (!socket) return; // Guard against null
    const handleStatusChange = (state: { phase: string; data: any }) => {
      console.log("phase", state.phase);
      console.log("data", state.data);
      switch (state.phase) {
        case "answers":
          if (state.data.hasAnswered) setStatus("loading");
          else {
            setAnswersCount(state.data.answerOptions.length);
            setStatus(state.phase);
          }
          break;
        case "results":
        case "leaderboard":
          setStatus("answerFeedback");
          setIsCorrect(state.data.isCorrect);
          setCurrentRank(state.data?.currentRank ?? null);
          break;
        case "podium":
          setCurrentRank(state.data?.currentRank ?? null);
          setPoints(state.data.score ?? 0);
          setStatus(state.phase);
          break;
        default:
          setStatus(state.phase as GameStatus);
          break;
      }

      if (state.data?.score) {
        setPoints(state.data.score);
      }
    };

    socket.on("game-state", handleStatusChange);

    return () => {
      socket.off("game-state", handleStatusChange);
    };
  }, [socket, status]);

  useEffect(() => {
    if (!socket) return;
    socket.emit("game-event", {
      type: "get-game-state",
      payload: {},
    });
  }, []);

  const statusElement = {
    lobby: (
      <WaitingForHost nickname={localStorage.getItem("nickname") || "Guest"} />
    ),
    answers: (
      <AnswerOptions
        viewMode="player"
        answersCount={answersCount}
        onAnswerClick={handleAnswerClick}
      />
    ),
    question: <CountDown initialSeconds={5} />,
    loading: <Loading />,
    answerFeedback: (
      <AnswerFeedback isCorrect={isCorrect} currentRank={currentRank} />
    ),
    podium: <FinalRank currentRank={currentRank} points={points} />,
  };

  return (
    <div className={classes.background}>
      {statusElement[status]}
      <PlayerCard
        name={localStorage.getItem("nickname") || "Guest"}
        points={points}
      />
    </div>
  );
};

export default PlayerGamePage;
