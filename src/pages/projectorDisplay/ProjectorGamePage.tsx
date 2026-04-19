import { useEffect, useState } from "react";
import { useSocket } from "../../store/SocketContext";
import GameQuestion from "../../components/quiz/GameQuestion";
import Question from "../../components/quiz/Question";
import { useLocation } from "react-router-dom";
import Leaderboard from "../../components/projector/Leaderboard";
import GameFinalResults from "../../components/quiz/GameFinalResults";

const ProjectorGamePage = () => {
  const INTRO_DURATION = 5;

  const location = useLocation();
  const initialData = location.state.data;
  const initialPhase = location.state.phase;

  const [status, setStatus] = useState(initialPhase);
  const [question, setQuestion] = useState(initialData?.question || "");
  const [scoringWeight, setScoringWeight] = useState(
    initialData?.scoringWeight || "",
  );
  const [answerTexts, setAnswerTexts] = useState<string[]>([]);

  const [playerAnsweredNum, SetPlayerAnsweredNum] = useState(0);
  const [duration, setDuration] = useState(20);
  const [timeLeft, setTimeLeft] = useState(20);
  const showResults = timeLeft === 0;

  const [correctAnswerIndex, SetCorrectAnswerIndex] = useState(0);
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
          setQuestion(state.data?.question ?? "");
          setScoringWeight(state.data?.scoringWeight ?? 1);
          break;
        case "answers":
          setAnswerTexts(state.data?.answers ?? []);
          setTimeLeft(state.data?.timeLimit ?? 20);
          setDuration(state.data?.timeLimit ?? 20);
          setScoringWeight(state.data?.scoringWeight ?? 1);
          // reset variables
          SetPlayerAnsweredNum(0);
          setAnswerDistributionArrray(
            new Array(state.data?.answers?.length ?? 2).fill(0),
          );
          break;

        case "results":
          setAnswerTexts(state.data?.answers ?? []);
          setAnswerDistributionArrray(state.data?.distribution ?? []);
          SetCorrectAnswerIndex(state.data?.correctAnswers?.[0]);
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

    const timer = setTimeout(() => {
      socket.emit("game-event", {
        type: "reveal-answers",
        payload: {},
      });
    }, INTRO_DURATION * 1000 - 1.5);

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

  return (
    <>
      {status === "question"  && (
        <Question
          question={question}
          currentQuestion={1} // todo get from server
          questionCount={2} // todo get from server
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
          correctAnswerIndex={correctAnswerIndex} 
          answerDistributionArrray={answerDistributionArrray} 
        />
      )}
      {status === "leaderboard" && <Leaderboard rankingArray={rankingArray} />}
      {status === "podium" && <GameFinalResults
        results={rankingArray}
      />}
    </>
  );
};

export default ProjectorGamePage;
