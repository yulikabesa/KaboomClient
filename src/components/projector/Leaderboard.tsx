import React from 'react';
import classes from './Leaderboard.module.css';

// דוגמא לשימוש:
{/* <Leaderboard
    rankingArray={[
        { nickname: 'נגה', score: 400, rankChangeDirection: 'UP' },
        { nickname: 'חתול', score: 300, rankChangeDirection: 'UNCHANGED' },
        { nickname: 'ברווז', score: 200, rankChangeDirection: 'UP' },
        { nickname: 'ציפור', score: 100, rankChangeDirection: 'DOWN' },
        { nickname: 'דובי', score: 70, rankChangeDirection: 'UNCHANGED' },
        { nickname: 'עכבר', score: 20, rankChangeDirection: 'UNCHANGED' },
    ]}
/> */}

type Rank = {
    nickname: string;
    score: number;
    rankChangeDirection: string ;
    // 'UP' | 'DOWN' | 'UNCHANGED';
};

const Leaderboard: React.FC<{ rankingArray: Rank[] }> = (props) => {
    return (
        <>
            <div className={classes['score-title']}>
                ניקוד
            </div>
            <div className={classes['btn']} >
                הבא
            </div>
            <div className={classes['Leaderboard-container']}>
                {props.rankingArray.map((item, index) => (
                    <div key={index} className={classes['Leaderboard-line']}>
                        <div className={classes['right-side-items']}>
                            <span className={classes.bolder}>{index + 1}</span>
                            <span>{item.nickname}</span>
                        </div>
                        <div className={classes['left-side-items']}>
                            <span className={classes.bolder}>{item.score}</span>
                            <span
                                className={`${item.rankChangeDirection === "DOWN" ? classes.down : ""}`}
                                style={{
                                    color:
                                        item.rankChangeDirection === "UP"
                                            ? "#288906"
                                            : item.rankChangeDirection === "DOWN"
                                                ? "#E21B3C"
                                                : "transparent",
                                }}
                            >
                                ▲
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Leaderboard;