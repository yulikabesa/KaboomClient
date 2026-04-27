import PlayerCard from "../../components/player/PlayerCard";
import AnswerOptions from "../../components/AnswerOptions";
import { useEffect, useState } from "react";
import Loading from "../../components/player/Loading";
import AnswerFeedback from "../../components/player/AnswerFeedback";
import WaitingForHost from "../../components/player/WaitingForHost";
import { useSocket } from "../../store/SocketContext";
import CountDown from "../../components/player/CountDown";
import FinalRank from "../../components/player/FinalRank";

type GameStatus =
  | "lobby"
  | "question"
  | "answers"
  | "loading"
  | "correct"
  | "wrong"
  | "podium";

const PlayerGamePage = () => {
  const [status, setStatus] = useState<GameStatus>("loading");
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
            setStatus(state.phase as GameStatus);
          }
          break;
        case "results":
        case "leaderboard":
          if (state.data.isCorrect) {
            setStatus("correct");
          } else {
            setStatus("wrong");
          }
          setCurrentRank(state.data?.currentRank ?? null);
          // setPoints(state.data.points);
          break;
        case "podium":
          setCurrentRank(state.data?.currentRank ?? null);
          setPoints(state.data.score ?? 0);
          setStatus("podium");
          break;
        default:
          setStatus(state.phase as GameStatus);
          break;
      }
      if (state.data?.score){
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
      {status === "question" && <CountDown initialSeconds={5} />}
      {status === "loading" && <Loading />}
      {status === "correct" && (
        <AnswerFeedback wasCorrect={true} currentRank={currentRank} />
      )}
      {status === "wrong" && (
        <AnswerFeedback wasCorrect={false} currentRank={currentRank} />
      )}
      {status === "podium" && (
        <FinalRank currentRank={currentRank} points={points} />
      )}
      <PlayerCard
        name={localStorage.getItem("nickname") || "Guest"}
        points={points}
      />
    </>
  );
};

export default PlayerGamePage;
