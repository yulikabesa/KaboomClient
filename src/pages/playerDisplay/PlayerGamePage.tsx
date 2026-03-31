import PlayerCard from "../../components/player/PlayerCard";
import AnswerOptions from "../../components/AnswerOptions";
import { useEffect, useState } from "react";
import Loading from "../../components/player/Loading";
import AnswerFeedback from "../../components/player/AnswerFeedback";
import WaitingForHost from "../../components/player/WaitingForHost";
import { useSocket } from "../../store/SocketContext";

type GameStatus = "lobby" | "answers" | "loading" | "correct" | "wrong";

const PlayerGamePage = () => {
  const [status, setStatus] = useState<GameStatus>("loading");
  const socket = useSocket();
  const handleAnswerClick = (answerIndex: number) => {
    setStatus("loading");
    // todo send through socket the answer
  };
  useEffect(() => {
    if (!socket) return; // Guard against null
    const handleStatusChange = (state: { phase: string; data: any }) => {
      console.log(state.phase);
      setStatus(state.phase as GameStatus);
      // todo add more statuses
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
          answersCount={4}
          onAnswerClick={handleAnswerClick}
        />
      )}
      {/* to change answersCount number to receive from server later */}
      {status === "loading" && <Loading />}
      {status === "correct" && <AnswerFeedback wasCorrect={true} />}
      {status === "wrong" && <AnswerFeedback wasCorrect={false} />}
      <PlayerCard
        name={localStorage.getItem("nickname") || "Guest"}
        points="777"
      />
    </>
  );
};

export default PlayerGamePage;
