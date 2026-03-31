import { useEffect, useState } from "react";
import { useSocket } from "../../store/SocketContext";
import GameQuestion from "../../components/quiz/GameQuestion";
import Question from "../../components/quiz/Question";
import { useLocation } from "react-router-dom";

const ProjectorGamePage = () => {
    const [status, setStatus] = useState("question");

    const INTRO_DURATION = 10;
    const location = useLocation();
    const initialData = location.state?.questionData;

    const [question, setQuestion] = useState(initialData?.question || " ");
    const [answerTexts, setAnswerTexts] = useState<string[]>(initialData?.answers || []);

    const [showIntroQuestion, setShowIntroQuestion] = useState(true);

    const playerAnsweredNum = 0;
    const duration = initialData?.timeLimit || 0;
    const [timeLeft, setTimeLeft] = useState(initialData?.timeLimit || 0);
    const showResults = timeLeft === 0;
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        const handler = (state: { phase: string; data: any }) => {
            setStatus(state.phase);
            // todo based on data: set state variables
        };

        socket.on("game-state", handler);

        return () => {
            socket.off("game-state", handler);
        };
    }, [socket]);

    useEffect(() => {
        if (status !== "question") return;

        setShowIntroQuestion(true);

        const timer = setTimeout(() => {
            setShowIntroQuestion(false);
        }, INTRO_DURATION * 1000); // 10 seconds

        return () => clearTimeout(timer);
    }, [status, question]);

    return (
        <>
            {status === "question" && showIntroQuestion &&
                <Question question={question}
                    currentQuestion={1} // todo get from server
                    questionCount={2} // todo get from server
                    duration={INTRO_DURATION}
                />
            }
            {status === "question" && !showIntroQuestion &&
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
            }
        </>
    );
}

export default ProjectorGamePage;
