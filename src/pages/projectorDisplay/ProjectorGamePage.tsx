import { useEffect, useState } from "react";
import { useSocket } from "../../store/SocketContext";
import GameQuestion from "../../components/quiz/GameQuestion";
import Question from "../../components/quiz/Question";
import { useLocation } from "react-router-dom";
import Leaderboard from "../../components/projector/Leaderboard";

const ProjectorGamePage = () => {
  const INTRO_DURATION = 5;

  const location = useLocation();
  const initialData = location.state.data;
  const initialPhase = location.state.phase;

  const [status, setStatus] = useState(initialPhase);
  const [question, setQuestion] = useState(initialData?.question || "");
  const [answerTexts, setAnswerTexts] = useState<string[]>([]);

  const [showIntroQuestion, setShowIntroQuestion] = useState(true);

  const [playerAnsweredNum, SetPlayerAnsweredNum] = useState(0);
  const duration = 20;
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
      setStatus(state.phase);
      switch (state.phase) {
        case "question":
          setQuestion(state.data?.question ?? "")
          break;
        case "answers":
          setAnswerTexts(state.data?.answers ?? []);
          break;

        case "results":
          setAnswerTexts(state.data?.answers ?? []);
          setAnswerDistributionArrray(state.data?.distribution ?? []);
          SetCorrectAnswerIndex(state.data?.correctAnswers?.[0]);
          setTimeLeft(0);
          break;

        case "leaderboard":
          SetRankingArray(state.data);
          break;
      }
    };

    socket.on("game-state", handler);
    return () => socket.off("game-state", handler);
  }, [socket]);

  useEffect(() => {
    if (status !== "question" || !socket) return;

    setShowIntroQuestion(true);

    const timer = setTimeout(() => {
      socket.emit("game-event", {
        type: "reveal-answers",
        payload: {},
      });
      setShowIntroQuestion(false);
    }, INTRO_DURATION * 1000);

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
      {status === "question" && showIntroQuestion && (
        <Question
          question={question}
          currentQuestion={1} // todo get from server
          questionCount={2} // todo get from server
          duration={INTRO_DURATION}
        />
      )}
      {(status === "answers" || status === "results") && (
        <GameQuestion
          question={question}
          playerAnsweredNum={playerAnsweredNum}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          answerTexts={answerTexts}
          duration={duration}
          showAnswer={showResults}
          correctAnswerIndex={correctAnswerIndex} // todo get from server
          answerDistributionArrray={answerDistributionArrray} // todo get from server
        />
      )}
      {status === "leaderboard" && <Leaderboard rankingArray={rankingArray} />}
    </>
  );
};

export default ProjectorGamePage;
