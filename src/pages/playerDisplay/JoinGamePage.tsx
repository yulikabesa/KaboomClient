import classes from './JoinGamePage.module.css';
import kaboomLogo from '../../assets/kaboomLogo.png';
import React, { useState } from 'react';
import { MyKabooms } from '../projectorDisplay/MyKabooms';
import { connectSocket } from "../../services/socketService";

const JoinGamePage: React.FC = () => {
    const [pin, setPin] = useState('');
    const [didSubmitPin, setDidSubmitPin] = useState(false);
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');

    const handlePinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPin(event.target.value);
        setError('');
    };

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
        setError('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // PIN validation
        if (!didSubmitPin) {
            if (!pin.trim()) {
                setError("הקוד לא יכול להיות ריק");
                return;
            }

            if (pin.length < 4) {
                setError("הקוד קצר מדי");
                return;
            }

            setError('');
            setDidSubmitPin(true);
            return;
        }

        // nickname validation
        if (!nickname.trim()) {
            setError("יש להזין שם");
            return;
        }

        setError(''); // clear error

        // join game
        const socket = connectSocket();
        // Emit event to join gam
        socket.emit("join-game", { pin, nickname });
        // todo navigate to game page
    };

    return (
        <>
            <div className={classes['parent-div']}>
                <img src={kaboomLogo}
                    alt="kaboom logo" />
                <form className={classes['child-div']} onSubmit={handleSubmit}>
                    {!didSubmitPin ? (
                        <>
                            <input
                                type="text"
                                value={pin}
                                placeholder='הכנס קוד'
                                onChange={handlePinChange}
                                className={classes['pin-input']} />
                            <button
                                type='submit'
                                className={classes['join-button']}>
                                כנס
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                type="text"
                                value={nickname}
                                placeholder='כתוב שם'
                                onChange={handleNicknameChange}
                                className={classes['pin-input']} />
                            <button
                                type='submit'
                                className={classes['join-button']}>
                                אחלה, מתחברים!
                            </button>
                        </>
                    )}
                    {error &&
                        <p className={classes['error-text']}>
                            {error}
                        </p>
                    }
                </form>
            </div>
            <MyKabooms />
            <div className={classes['info']}>
                <p className={classes['info-text']}>צור את ה”קאבום” שלך בקלות דרך Kaboom.com/create</p>
                <p className={classes['credit-text']}>זכויות שמורות לארטק מדור טכנולוגיות למידה</p>
            </div>
        </>
    )
}

export default JoinGamePage;
