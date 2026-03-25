import { useEffect, useState } from "react";
import { useSocket } from "../../store/SocketContext";
import GameQuestion from "../../components/quiz/GameQuestion";
// import Question from "../../components/quiz/Question";
import { useLocation } from "react-router-dom";

const ProjectorGamePage = () => {
    const [status, setStatus] = useState("question");

    const location = useLocation();
    const initialData = location.state?.questionData;
    const [question, setQuestion] = useState(initialData?.question || " ");
    const playerAnsweredNum = 0;
    const [timeLeft, setTimeLeft] = useState(initialData?.timeLimit || 0);
    const [answerTexts, setAnswerTexts] = useState<string[]>(initialData?.answers || []);
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;
        socket.on("game-state", (
            state: {
                phase: string;
                data: any;
            }) => {
            setStatus(state.phase);
            // todo based on data: set state variables
        });
    }, [socket]);

    return (
        <>
            {/* {status === "question" &&
                <Question question=""
                    currentQuestion={1}
                    questionCount={2}
                />
            } */}
            {status === "question" &&
                <GameQuestion
                    question={question}
                    playerAnsweredNum={playerAnsweredNum}
                    timeLeft={timeLeft}
                    setTimeLeft={setTimeLeft}
                    answerTexts={answerTexts}
                />
            }
        </>
    );
}

export default ProjectorGamePage;
