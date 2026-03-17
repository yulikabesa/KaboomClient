import AnswerOptions from '../../components/AnswerOptions';
import CountdownCircle from '../../components/projector/CountdownCircle';
import classes from './GameQuestion.module.css';

const GameQuestion = () => {
    // todo change those variables that are hardcoded 
    const question = "שאלה ממש ממש ממש ממש ממש ממש גדולה ארוכה ומשעממת את לפחות שתי שורות?";
    const playerAnsweredNum = 2;
    const duration = 12; // timer duration
    return (
        <>
            <div className={classes['top-container']}>
                <div className={classes['question']}>{question}</div>
                <div className={classes['shorten-time-btn']}>קיצור זמנים</div>
            </div>
            <div className={classes['answered-and-time-container']}>
                <div className={classes['players-answered-container']}>
                    <p className={classes['players-answered-num']}>{playerAnsweredNum}</p>
                    <p className={classes['players-answered-text']}>ענו</p>
                </div>
                <CountdownCircle duration={duration} />
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