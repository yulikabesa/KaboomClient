import { useEffect, useState } from "react";
import { useSocket } from "../../store/SocketContext";
import GameQuestion from "../../components/quiz/GameQuestion";
import Question from "../../components/quiz/Question";
import { useLocation } from "react-router-dom";

const ProjectorGamePage = () => {
  const [status, setStatus] = useState("loading");

  const INTRO_DURATION = 10;
  const location = useLocation();
  const initialData = location.state?.questionData;

  const [question, setQuestion] = useState(initialData?.question || "");
  const [answerTexts, setAnswerTexts] = useState<string[]>([]);

  const [showIntroQuestion, setShowIntroQuestion] = useState(true);

  const playerAnsweredNum = 0;
  const duration = 20;
  const [timeLeft, setTimeLeft] = useState(20);
  const showResults = timeLeft === 0;
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handler = (state: any) => {
      setStatus(state.phase);
      setAnswerTexts(state.data.answers);
    };

    socket.on("game-state", handler);
    return () => socket.off("game-state", handler);
  }, [socket]);

  useEffect(() => {
    if (status !== "question" || !socket) return;

    setShowIntroQuestion(true);

    const timer = setTimeout(() => {
      setShowIntroQuestion(false);
      socket.emit("game-event", {
        type: "reveal-answers",
        payload: {},
      });
    }, INTRO_DURATION * 1000);

    return () => clearTimeout(timer);
  }, [status, socket]);

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
      {status === "answers" && (
        <GameQuestion
          question={question}
          playerAnsweredNum={playerAnsweredNum}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          answerTexts={answerTexts}
          duration={duration}
          showAnswer={showResults}
          correctAnswerIndex={1} // todo get from server
          answerDistributionArrray={[0, 1]} // todo get from server
        />
      )}
    </>
  );
};

export default ProjectorGamePage;
