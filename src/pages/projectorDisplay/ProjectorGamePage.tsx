import { useEffect, useState } from "react";
import { useSocket } from "../../store/SocketContext";
import GameQuestion from "../../components/quiz/GameQuestion";
import Question from "../../components/quiz/Question";
import { useLocation } from "react-router-dom";

const ProjectorGamePage = () => {
    const [status, setStatus] = useState("question");

    const location = useLocation();
    const initialData = location.state?.questionData;
    const [question, setQuestion] = useState(initialData?.question || " ");
    const [showIntroQuestion, setShowIntroQuestion] = useState(true);
    const playerAnsweredNum = 0;
    const duration = initialData?.timeLimit || 0;
    const [timeLeft, setTimeLeft] = useState(initialData?.timeLimit || 0);
    const [answerTexts, setAnswerTexts] = useState<string[]>(initialData?.answers || []);
    const showResults = timeLeft === 0;
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

    useEffect(() => {
        if (status !== "question") return;

        // reset when entering question phase
        setShowIntroQuestion(true);

        const timer = setTimeout(() => {
            setShowIntroQuestion(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, [status, question]);

    return (
        <>
            {status === "question" && showIntroQuestion &&
                <Question question={question}
                    currentQuestion={1} // todo get from server
                    questionCount={2} // todo get from server
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
