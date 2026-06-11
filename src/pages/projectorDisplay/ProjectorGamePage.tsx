import { useEffect, useState } from "react";
import { useSocket } from "../../store/SocketContext";
import GameQuestion from "../../components/quiz/GameQuestion";
import Question from "../../components/quiz/Question";
import Leaderboard from "../../components/projector/Leaderboard";
import GameFinalResults from "../../components/quiz/GameFinalResults";
import Loading from "../../components/player/Loading";
import classes from "./GameLobby.module.css";

const ProjectorGamePage = () => {
  const INTRO_DURATION = 5;

  const [status, setStatus] = useState("loading");
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

  useEffect(() => {
    if (!socket) return;

    const handler = (state: any) => {
      console.log("state", state);
      // לאפס כמה ענו ולאפס גרף
      switch (state.phase) {
        case "question":
          setQuestion(state.data?.questionText ?? "");
          setScoringWeight(state.data?.scoringWeight ?? 1);
          setCurrentQuestion(state.data?.currentQuestion + 1);
          setQuestionCount(state.data?.questionCount ?? 1);
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
          break;

        case "results":
          setQuestion(state.data?.questionText ?? "");
          setAnswerTexts(state.data?.answerOptions ?? []);
          setAnswerDistributionArrray(state.data?.distribution ?? []);
          SetCorrectAnswerIndexes(state.data?.correctAnswers);
          setTimeLeft(0);
          break;

        case "leaderboard":
        case "podium":
          SetRankingArray(state.data);
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

  return (
    <div className={classes.background}>
      {status === "loading" && <Loading />}
      {status === "question" && (
        <Question
          question={question}
          currentQuestion={currentQuestion} // todo get from server
          questionCount={questionCount} // todo get from server
          duration={INTRO_DURATION}
          scoringWeight={scoringWeight}
        />
      )}
      {(status === "answers" || status === "results") && (
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
      )}
      {status === "leaderboard" && <Leaderboard rankingArray={rankingArray} />}
      {status === "podium" && <GameFinalResults results={rankingArray} />}
    </div>
  );
};

export default ProjectorGamePage;
