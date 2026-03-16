import React from 'react';
import soldierProfilePic from '../../assets/soldierProfilePic.svg';
import classes from './WaitingForHost.module.css';

const WaitingForHost: React.FC<{ nickname: string; }> = (props) => {
    return (
        <div className={classes['darker-background']}>
            <img className={classes['soldier-pic']} src={soldierProfilePic} alt='person icon' />
            <p className={classes['nickname']}>{props.nickname}</p>
            <p>אתה בפנים! רואה את השם שלך על המסך?</p>
        </div>
    )
}

export default WaitingForHost;