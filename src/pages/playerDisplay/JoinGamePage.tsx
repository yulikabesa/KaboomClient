import classes from './JoinGamePage.module.css';
import kaboomLogo from '../../assets/kaboomLogo.png';
import React, { useState } from 'react';

const JoinGamePage: React.FC = () => {
    const [pin, setPin] = useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPin(event.target.value);
    };
    return (
        <>
            <div className={classes['parent-div']}>
                <img src={kaboomLogo}
                    alt="kaboom logo" />
                <div className={classes['child-div']}>
                    <input type="text"
                        value={pin}
                        placeholder='הכנס קוד'
                        onChange={handleChange}
                        className={classes['pin-input']} />
                    <button className={classes['join-button']}>כנס</button>
                </div>
            </div>
            <div className={classes['info']}>
                <p className={classes['info-text']}>צור את ה”קאבום” שלך בקלות דרך Kaboom.com/create</p>
                <p className={classes['credit-text']}>זכויות שמורות לארטק מדור טכנולוגיות למידה</p>
            </div>
        </>
    )
}

export default JoinGamePage;
