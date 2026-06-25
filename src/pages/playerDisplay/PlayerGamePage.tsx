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
import layoutClasses from "../../components/UI/Layout.module.css";
import {
  type GameStateEvent,
  useInitialGameState,
} from "../../store/GameStateContext";
import { Navigate } from "react-router-dom";

export type GameStatus =
  | "loading"
  | "lobby"
  | "question"
  | "answers"
  | "results"
  | "leaderboard"
  | "podium"
  | null;

type Display = {
  status: GameStatus;
  isCorrect: boolean;
  answersCount: number;
  points: number;
  currentRank: number;
  rankAbove: string;
};

const defaultDisplay: Display = {
  status: null,
  isCorrect: false,
  answersCount: 0,
  points: 0,
  currentRank: 0,
  rankAbove: "",
};

function applyState(prev: Display, state: GameStateEvent): Display {
  const display: Display = { ...prev, status: state.phase as GameStatus };
  console.log("phase", state.phase);
  console.log("data", state.data);

  switch (state.phase) {
    case "answers":
      if (state.data?.hasAnswered) display.status = "loading";
      else display.answersCount = state.data?.answerOptions?.length ?? 0;
      break;
    case "results":
    case "leaderboard":
      display.currentRank = state.data?.currentRank ?? 0;
      display.rankAbove = state.data?.rankAbove ?? "";
      display.isCorrect = state.data?.isCorrect ?? false;
      break;
    case "podium":
      display.currentRank = state.data?.currentRank ?? 0;
      display.rankAbove = state.data?.rankAbove ?? "";
      break;
  }

  if (state.data?.score) display.points = state.data.score;

  return display;
}

const PlayerGamePage = () => {
  const socket = useSocket();
  const initialState = useInitialGameState();

  const [display, setDisplay] = useState<Display>(() =>
    applyState(defaultDisplay, initialState),
  );

  useEffect(() => {
    if (!socket) return;
    const handler = (state: GameStateEvent) =>
      setDisplay((prev) => applyState(prev, state));
    socket.on("game-state", handler);
    return () => {
      socket.off("game-state", handler);
    };
  }, [socket]);

  const handleAnswerClick = (answerIndex: number) => {
    setDisplay((prev) => ({ ...prev, status: "loading" }));
    socket.emit("game-event", {
      type: "submit-answer",
      payload: { answer: [answerIndex] },
    });
  };

  const { status, isCorrect, answersCount, points, currentRank, rankAbove } =
    display;

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
      {status ? statusElement[status] : <Navigate to={"/home"} replace />}
      <PlayerCard
        name={sessionStorage.getItem("nickname") || "Guest"}
        points={points}
      />
    </div>
  );
};

export default PlayerGamePage;
