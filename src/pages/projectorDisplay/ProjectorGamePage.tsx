import { useEffect, useState } from "react";
import { useSocket } from "../../store/SocketContext";
import GameQuestion from "../../components/quiz/GameQuestion";
import Question from "../../components/quiz/Question";
import Leaderboard from "../../components/projector/Leaderboard";
import GameFinalResults from "../../components/quiz/GameFinalResults";
import Loading from "../../components/player/Loading";
import { type GameStatus } from "../playerDisplay/PlayerGamePage";
import { Navigate } from "react-router-dom";
import layoutClasses from "../../components/UI/Layout.module.css";
import {
  type GameStateEvent,
  useInitialGameState,
} from "../../store/GameStateContext";

const INTRO_DURATION = 5;

type Display = {
  status: GameStatus;
  background: "light" | "dark";
  question: string;
  scoringWeight: number;
  currentQuestion: number;
  questionCount: number;
  answerOptions: string[];
  questionImage: string;
  duration: number;
  timeLeft: number;
  correctAnswerIndexes: number[];
  answerDistribution: number[];
  ranking: any[];
};

const defaultDisplay: Display = {
  status: null,
  background: "light",
  question: "",
  scoringWeight: 1,
  currentQuestion: 1,
  questionCount: 1,
  answerOptions: [],
  questionImage: "",
  duration: 20,
  timeLeft: 20,
  correctAnswerIndexes: [],
  answerDistribution: [],
  ranking: [],
};

function applyState(prev: Display, state: GameStateEvent): Display {
  const display: Display = { ...prev, status: state.phase as GameStatus };
  const data = state.data ?? {};

  console.log("phase", state.phase);
  console.log("data", state.data);

  switch (state.phase) {
    case "question":
      display.question = data.questionText ?? "";
      display.scoringWeight = data.scoringWeight ?? 1;
      display.currentQuestion = (data.currentQuestion ?? 0) + 1;
      display.questionCount = data.questionCount ?? 1;
      display.background = "light";
      break;
    case "answers":
      display.answerOptions = data.answerOptions ?? [];
      display.question = data.questionText ?? "";
      display.timeLeft = data.timeLimit ?? 20;
      display.duration = data.timeLimit ?? 20;
      display.scoringWeight = data.scoringWeight ?? 1;
      display.questionImage = data.questionImage ?? "";
      display.answerDistribution = new Array(
        data.answerOptions?.length ?? 2,
      ).fill(0);
      display.background = "light";
      break;
    case "results":
      display.question = data.questionText ?? "";
      display.answerOptions = data.answerOptions ?? [];
      display.answerDistribution = data.distribution ?? [];
      display.correctAnswerIndexes = data.correctAnswers ?? [];
      display.timeLeft = 0;
      display.background = "dark";
      break;
    case "leaderboard":
      display.ranking = data ?? [];
      display.background = "dark";
      break;
    case "podium":
      display.ranking = data ?? [];
      display.background = "light";
      break;
  }

  return display;
}

const ProjectorGamePage = () => {
  const socket = useSocket();
  const initialState = useInitialGameState();

  const [display, setDisplay] = useState<Display>(() =>
    applyState(defaultDisplay, initialState),
  );
  const [playersAnswered, setPlayersAnswered] = useState(0);

  useEffect(() => {
    if (!socket) return;
    const handler = (state: GameStateEvent) => {
      setDisplay((prev) => applyState(prev, state));
      if (state.phase === "answers") setPlayersAnswered(0);
    };
    socket.on("game-state", handler);
    return () => {
      socket.off("game-state", handler);
    };
  }, [socket]);

  useEffect(() => {
    if (display.status !== "question" || !socket) return;

    const timer = setTimeout(() => {
      socket.emit("game-event", {
        type: "reveal-answers",
        payload: {},
      });
    }, INTRO_DURATION * 1000);

    return () => clearTimeout(timer);
  }, [display.status, socket]);

  useEffect(() => {
    if (!socket) return;
    const progressHandler = (n: number) => setPlayersAnswered(n);
    socket.on("answer-progress", progressHandler);
    return () => {
      socket.off("answer-progress", progressHandler);
    };
  }, [socket]);

  const setTimeLeft: React.Dispatch<React.SetStateAction<number>> = (action) =>
    setDisplay((prev) => ({
      ...prev,
      timeLeft:
        typeof action === "function"
          ? (action as (n: number) => number)(prev.timeLeft)
          : action,
    }));

  const {
    status,
    background,
    question,
    scoringWeight,
    currentQuestion,
    questionCount,
    answerOptions,
    questionImage,
    duration,
    timeLeft,
    correctAnswerIndexes,
    answerDistribution,
    ranking,
  } = display;

  const showResults = status === "results";

  const answersAndResultsPage = (
    <GameQuestion
      question={question}
      playersAnswered={playersAnswered}
      timeLeft={timeLeft}
      setTimeLeft={setTimeLeft}
      answerOptions={answerOptions}
      scoringWeight={scoringWeight}
      duration={duration}
      showAnswer={showResults}
      correctAnswerIndexes={correctAnswerIndexes}
      answerDistributionArray={answerDistribution}
      questionImage={questionImage}
    />
  );

  const statusElement = {
    loading: <Loading />,
    // todo: decide -> lobby element
    lobby: <></>,
    answers: answersAndResultsPage,
    results: answersAndResultsPage,
    question: (
      <Question
        question={question}
        currentQuestion={currentQuestion}
        questionCount={questionCount}
        duration={INTRO_DURATION}
        scoringWeight={scoringWeight}
      />
    ),
    leaderboard: <Leaderboard rankingArray={ranking} />,
    podium: <GameFinalResults results={ranking} />,
  };

  return (
    <div
      className={`${layoutClasses["background"]} ${layoutClasses[`${background}-img`]}`}
    >
      {status ? statusElement[status] : <Navigate to="/home" replace />}
    </div>
  );
};

export default ProjectorGamePage;
