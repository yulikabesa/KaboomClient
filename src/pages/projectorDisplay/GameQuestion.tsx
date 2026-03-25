import { useEffect, useState } from 'react';
import AnswerOptions from '../../components/AnswerOptions';
import CountdownCircle from '../../components/projector/CountdownCircle';
import classes from './GameQuestion.module.css';
import { useSocket } from '../../store/SocketContext';
import { useLocation } from "react-router-dom";

const GameQuestion = () => {
    // todo change those variables that are hardcoded 
    const location = useLocation();
    const initialData = location.state?.questionData;
    const [question, setQuestion] = useState(initialData?.question || "שאלה ממש ממש ממש ממש ממש ממש גדולה ארוכה ומשעממת את לפחות שתי שורות?");
    const playerAnsweredNum = 0;
    const [timeLeft, setTimeLeft] = useState(initialData?.timeLimit || 0);
    const [answerTexts, setAnswerTexts] = useState<string[]>(initialData?.answers || []);
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return;

        // future events like next question can go here
    }, [socket]);

    return (
        <>
            <div className={classes['top-container']}>
                <div className={classes['question']}>{question}</div>
                <div className={classes['shorten-time-btn']} onClick={() => setTimeLeft(0)}>קיצור זמנים</div>
            </div>
            <div className={classes['answered-and-time-container']}>
                <div className={classes['players-answered-container']}>
                    <p className={classes['players-answered-num']}>{playerAnsweredNum}</p>
                    <p className={classes['players-answered-text']}>ענו</p>
                </div>
                <CountdownCircle
                    duration={timeLeft}
                    timeLeft={timeLeft}
                    setTimeLeft={setTimeLeft} />
            </div>
            <AnswerOptions viewMode="projector"
                answersCount={answerTexts.length}
                answerTexts={answerTexts}
                onAnswerClick={(i) => console.log(i)}
            />
        </>
    )
}

export default GameQuestion;