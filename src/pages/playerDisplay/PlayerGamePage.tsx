import PlayerCard from "../../components/player/PlayerCard";
import AnswerOptions from "../../components/AnswerOptions";
import { useEffect, useState } from "react";
import Loading from "../../components/player/Loading";
import AnswerFeedback from "../../components/player/AnswerFeedback";
import WaitingForHost from "../../components/player/WaitingForHost";
import { useSocket } from "../../store/SocketContext";
import { useLocation } from "react-router-dom";
import CountDown from "../../components/player/CountDown";

type GameStatus = "lobby" | "question" | "answers" | "loading" | "correct" | "wrong";

const PlayerGamePage = () => {
  const location = useLocation();
  const initialData = location.state.data;
  const initialPhase = location.state.phase;

  const [status, setStatus] = useState<GameStatus>(initialPhase);
  const [answersCount, setAnswersCount] = useState(0);
  const [points, setPoints] = useState("0");

  const socket = useSocket();
  const handleAnswerClick = (answerIndex: number) => {
    setStatus("loading");
    socket.emit("game-event", {
      type: "submit-answer",
      payload: {
        answer: [answerIndex],
        pin: localStorage.getItem('kaboom-pin-recovery')
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
          setAnswersCount(state.data.answers.length);
          setStatus(state.phase as GameStatus);
          break;
        case "results":
        case "leaderboard":
          if (state.data.isCorrect) {
            setStatus('correct');
          }
          else {
            setStatus('wrong');
          }
          // setPoints(state.data.points);
          break;
        default:
          setStatus(state.phase as GameStatus);
          break;
      }
    };

    socket.on("game-state", handleStatusChange);

    return () => {
      socket.off("game-state", handleStatusChange);
    };
  }, [socket, status]);

  return (
    <>
      {status === "lobby" && (
        <WaitingForHost
          nickname={localStorage.getItem("nickname") || "Guest"}
        />
      )}
      {status === "answers" && (
        <AnswerOptions
          viewMode="player"
          answersCount={answersCount}
          onAnswerClick={handleAnswerClick}
        />
      )}
      {status === 'question' && <CountDown initialSeconds={5} />}
      {/* to change answersCount number to receive from server later */}
      {status === "loading" && <Loading />}
      {status === "correct" && <AnswerFeedback wasCorrect={true} />}
      {status === "wrong" && <AnswerFeedback wasCorrect={false} />}
      <PlayerCard
        name={localStorage.getItem("nickname") || "Guest"}
        points={points}
      />
    </>
  );
};

export default PlayerGamePage;
