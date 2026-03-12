import classes from './PlayerCard.module.css';
import soldierProfilePic from '../../assets/soldierProfilePic.svg';
import type React from 'react';

const PlayerCard: React.FC<{name: string; points: string;}> = (props) => {
    return (
        <div className={classes['container']}>
            <img className={classes['player-photo']} src={soldierProfilePic} alt='player picture' />
            <p className={classes['player-name']}>{props.name}</p>
            <div className={classes['player-points']}>{props.points}</div>
        </div>
    )
}

export default PlayerCard;