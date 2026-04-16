import React from 'react';
import correctSymbol from '../../assets/correct.svg';
import mistakeSymbol from '../../assets/mistake.svg';
import classes from './AnswerFeedback.module.css';

const AnswerFeedback: React.FC<{ wasCorrect: boolean; currentRank: number | null }> = (props) => {
    const title = props.wasCorrect ? 'תשובה נכונה' : 'תשובה לא נכונה';
    const symbol = props.wasCorrect ? correctSymbol : mistakeSymbol;
    const divClass = props.wasCorrect ? classes.correct : classes.mistaken;

    return (
        <div className={classes.centering}>
            <p className={classes.title}>{title}</p>
            <div className={divClass}>
                <img className={classes.symbol} src={symbol} alt={title} />
            </div>
            {props.currentRank ? <p className={classes.text}>מקום {props.currentRank} אחרי מתן גרשון</p> : ''}
            {/* todo change this text to what is received from server */}
        </div>
    );
}

export default AnswerFeedback;