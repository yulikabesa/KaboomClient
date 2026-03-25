import { useEffect, useState } from 'react';
import AnswerOptions from '../../components/AnswerOptions';
import CountdownCircle from '../../components/projector/CountdownCircle';
import classes from './GameQuestion.module.css';
import { useSocket } from '../../store/SocketContext';

const GameQuestion = () => {
    // todo change those variables that are hardcoded 
    const [question, setQuestion] = useState("שאלה ממש ממש ממש ממש ממש ממש גדולה ארוכה ומשעממת את לפחות שתי שורות?");
    const playerAnsweredNum = 2;
    const duration = 12; // timer duration
    const [timeLeft, setTimeLeft] = useState(duration);
    const socket = useSocket();

    useEffect(() => {
        if (!socket) return; // Guard against null
        const getQuestion = (question: {
            question: any;
            answers: any;
            timeLimit: any;
        }) => {
            setQuestion(question.question);
        };

        socket.on("game-started", getQuestion);

        return () => {
            socket.off("game-started", getQuestion);
        };
    }, []);

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
                    duration={duration}
                    timeLeft={timeLeft}
                    setTimeLeft={setTimeLeft} />
            </div>
            <AnswerOptions viewMode="projector"
                answersCount={4}
                answerTexts={['דוגמא 1', 'דוגמא 2', 'דוגמא 3', 'דוגמא 4']}
                onAnswerClick={(i) => console.log(i)}
            />
        </>
    )
}

export default GameQuestion;