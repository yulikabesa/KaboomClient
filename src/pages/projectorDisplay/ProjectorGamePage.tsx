import { useEffect, useState } from "react";
import { useSocket } from "../../store/SocketContext";
import GameQuestion from "../../components/quiz/GameQuestion";
import Question from "../../components/quiz/Question";
import Leaderboard from "../../components/projector/Leaderboard";
import GameFinalResults from "../../components/quiz/GameFinalResults";
import Loading from "../../components/player/Loading";
import { type GameStatus } from "../playerDisplay/PlayerGamePage";
import { Navigate } from "react-router-dom";
import classes from "./GameLobby.module.css";
import layoutClasses from "../../components/UI/Layout.module.css";
import { useRouteLoading } from "../../store/RouteLoadingContext";

const ProjectorGamePage = () => {
  const [mode, setMode] = useState("light");
  const INTRO_DURATION = 5;

  const [status, setStatus] = useState<GameStatus>("loading");
  const [question, setQuestion] = useState("");
  const [scoringWeight, setScoringWeight] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questionCount, setQuestionCount] = useState(1);
  const [answerTexts, setAnswerTexts] = useState<string[]>([]);
  const [questionImage, setQuestionImage] = useState("");

  const [playerAnsweredNum, SetPlayerAnsweredNum] = useState(0);
  const [duration, setDuration] = useState(20);
  const [timeLeft, setTimeLeft] = useState(20);
  const showResults = status === "results";

  const [correctAnswerIndexes, SetCorrectAnswerIndexes] = useState<number[]>(
    [],
  );
  const [answerDistributionArrray, setAnswerDistributionArrray] = useState([
    0, 0,
  ]);
  const [rankingArray, SetRankingArray] = useState([]);
  const socket = useSocket();
  const routeLoading = useRouteLoading();

  useEffect(() => {
    if (!socket) return;

    const handler = (state: any) => {
      console.log("state", state);
      routeLoading?.setReady();
      switch (state.phase) {
        case "question":
          setQuestion(state.data?.questionText ?? "");
          setScoringWeight(state.data?.scoringWeight ?? 1);
          setCurrentQuestion(state.data?.currentQuestion + 1);
          setQuestionCount(state.data?.questionCount ?? 1);
          setMode("light");
          break;
        case "answers":
          setAnswerTexts(state.data?.answerOptions ?? []);
          setQuestion(state.data?.questionText ?? "");
          setTimeLeft(state.data?.timeLimit ?? 20);
          setDuration(state.data?.timeLimit ?? 20);
          setScoringWeight(state.data?.scoringWeight ?? 1);
          setQuestionImage(state.data?.questionImage ?? "");
          // reset variables
          SetPlayerAnsweredNum(0);
          setAnswerDistributionArrray(
            new Array(state.data?.answerOptions?.length ?? 2).fill(0),
          );
          setMode("light");
          break;

        case "results":
          setQuestion(state.data?.questionText ?? "");
          setAnswerTexts(state.data?.answerOptions ?? []);
          setAnswerDistributionArrray(state.data?.distribution ?? []);
          SetCorrectAnswerIndexes(state.data?.correctAnswers);
          setTimeLeft(0);
          setMode("dark");
          break;

        case "leaderboard":
          SetRankingArray(state.data);
          setMode("dark");
          break;
        case "podium":
          SetRankingArray(state.data);
          setMode("light");
          break;
      }
      setStatus(state.phase);
    };

    socket.on("game-state", handler);
    return () => socket.off("game-state", handler);
  }, [socket]);

  useEffect(() => {
    if (status !== "question" || !socket) return;

    const timer = setTimeout(
      () => {
        socket.emit("game-event", {
          type: "reveal-answers",
          payload: {},
        });
      },
      INTRO_DURATION * 1000 - 1.5,
    );

    return () => clearTimeout(timer);
  }, [status, socket]);

  useEffect(() => {
    if (!socket) return;

    const progressHandler = (answeredNumber: number) => {
      SetPlayerAnsweredNum(answeredNumber);
    };

    socket.on("answer-progress", progressHandler);

    return () => socket.off("answer-progress", progressHandler);
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.emit("game-event", {
      type: "get-game-state",
      payload: {},
    });
  }, []);

  const answersAndResultsPage = (
    <GameQuestion
      question={question}
      playerAnsweredNum={playerAnsweredNum}
      timeLeft={timeLeft}
      setTimeLeft={setTimeLeft}
      answerTexts={answerTexts}
      scoringWeight={scoringWeight}
      duration={duration}
      showAnswer={showResults}
      correctAnswerIndexes={correctAnswerIndexes}
      answerDistributionArrray={answerDistributionArrray}
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
    leaderboard: <Leaderboard rankingArray={rankingArray} />,
    podium: <GameFinalResults results={rankingArray} />,
  };

  return (
    <div
      className={`${classes.background} ${layoutClasses["background"]} ${layoutClasses[`${mode}-img`]}`}
    >
      {statusElement[status]}
    </div>
  );
};

export default ProjectorGamePage;
