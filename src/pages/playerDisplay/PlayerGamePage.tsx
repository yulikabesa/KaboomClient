import PlayerCard from "../../components/player/PlayerCard";
import AnswerOptions from "../../components/AnswerOptions";
import { useEffect, useState } from "react";
import Loading from "../../components/player/Loading";
import AnswerFeedback from "../../components/player/AnswerFeedback";
import WaitingForHost from "../../components/player/WaitingForHost";
import { useSocket } from "../../store/SocketContext";
import { useRouteLoading } from "../../store/RouteLoadingContext";
import CountDown from "../../components/player/CountDown";
import FinalRank from "../../components/player/FinalRank";
import classes from "./JoinGamePage.module.css";
import layoutClasses from "../../components/UI/Layout.module.css";

export type GameStatus =
  | "loading"
  | "lobby"
  | "question"
  | "answers"
  | "results"
  | "leaderboard"
  | "podium";

const PlayerGamePage = () => {
  const [status, setStatus] = useState<GameStatus>("loading");
  const [isCorrect, setIsCorrect] = useState(false);
  const [answersCount, setAnswersCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [currentRank, setCurrentRank] = useState(0);
  const [rankAbove, setRankAbove] = useState("");

  const socket = useSocket();
  const routeLoading = useRouteLoading();
  const handleAnswerClick = (answerIndex: number) => {
    // setStatus("loading");
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
      routeLoading?.setReady();
      switch (state.phase) {
        case "answers":
          if (state.data.hasAnswered) setStatus("loading");
          else {
            setStatus(state.phase);
            setAnswersCount(state.data.answerOptions.length);
          }
          break;
        case "results":
        case "leaderboard":
          setStatus(state.phase);
          setCurrentRank(state.data?.currentRank ?? null);
          setRankAbove(state.data?.rankAbove ?? null);
          setIsCorrect(state.data.isCorrect);
          break;
        case "podium":
          setStatus(state.phase);
          setCurrentRank(state.data?.currentRank ?? null);
          setRankAbove(state.data?.rankAbove ?? null);
          setPoints(state.data.score ?? 0);
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

  const answerFeedback = (
    <AnswerFeedback
      isCorrect={isCorrect}
      currentRank={currentRank}
      rankAbove={rankAbove}
    />
  );

  const statusElement = {
    loading: <Loading />,
    lobby: (
      <WaitingForHost
        nickname={sessionStorage.getItem("nickname") || "Guest"}
      />
    ),
    answers: (
      <AnswerOptions
        viewMode="player"
        answersCount={answersCount}
        onAnswerClick={handleAnswerClick}
      />
    ),
    question: <CountDown initialSeconds={5} />,
    results: answerFeedback,
    leaderboard: answerFeedback,
    podium: (
      <FinalRank
        currentRank={currentRank}
        points={points}
        rankAbove={rankAbove}
      />
    ),
  };

  return (
    <div
      className={`${classes.page} ${layoutClasses["background"]} ${layoutClasses["light-img"]}`}
    >
      {statusElement[status]}
      <PlayerCard
        name={sessionStorage.getItem("nickname") || "Guest"}
        points={points}
      />
    </div>
  );
};

export default PlayerGamePage;
