import { type Dispatch, type SetStateAction } from 'react';
import AnswerOptions from '../AnswerOptions';
import CountdownCircle from '../projector/CountdownCircle';
import classes from './GameQuestion.module.css';
import BarIndicatorsList from '../projector/BarIndicatorsList';

const GameQuestion: React.FC<{ question: string, playerAnsweredNum: number, timeLeft: number, setTimeLeft: Dispatch<SetStateAction<number>>, answerTexts: string[], duration: number, showAnswer: boolean }> = (props) => {

    return (
        <>
            <div className={classes['top-container']}>
                <div className={classes['question']}>{props.question}</div>
                {props.showAnswer ?
                    <div className={classes['shorten-time-btn']} onClick={() => props.setTimeLeft(0)}>
                        הבא
                    </div>
                    :
                    <div className={classes['shorten-time-btn']} >
                        קיצור זמנים
                    </div>
                }
            </div>
            {props.showAnswer ?
                <div className={classes['bar-indicators-wrapper']}>
                    <BarIndicatorsList
                        answersCount={2}
                        correctAnswerIndex={0}
                        maxValue={1}
                        values={[1, 0, 3, 4]}
                    />
                </div>
                :
                <div className={classes['answered-and-time-container']}>
                    <div className={classes['players-answered-container']}>
                        <p className={classes['players-answered-num']}>{props.playerAnsweredNum}</p>
                        <p className={classes['players-answered-text']}>ענו</p>
                    </div>
                    <CountdownCircle
                        duration={props.duration}
                        timeLeft={props.timeLeft}
                        setTimeLeft={props.setTimeLeft} />
                </div>
            }
            <AnswerOptions viewMode="projector"
                answersCount={props.answerTexts.length}
                answerTexts={props.answerTexts}
                onAnswerClick={(i) => console.log(i)}
                {...(props.showAnswer ? { correctAnswerIndex: 1 } : {})}
            />
        </>
    )
}

export default GameQuestion;