import classes from './JoinGamePage.module.css';
import kaboomLogo from '../../assets/kaboomLogo.png';
import React, { useState } from 'react';
import { MyKabooms } from '../projectorDisplay/MyKabooms';
import { connectSocket } from "../../services/socketService";

const JoinGamePage: React.FC = () => {
    const [pin, setPin] = useState('');
    const [didSubmitPin, setDidSubmitPin] = useState(false);
    const [nickname, setNickname] = useState('');

    const handlePinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPin(event.target.value);
    };

    const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };

    const joinGame = () => {
        const socket = connectSocket();

        // Emit event to join game
        socket.emit("join-game", { pin, nickname });
        // todo navigate to game page


        // todo move this to project side
        // Listen for the game-created event only once
        socket.once("player-joined", ({ player }: { player: { id: string; nickname: string; } }) => {
            console.log("player joined:", player);
        });
    };

    return (
        <>
            <div className={classes['parent-div']}>
                <img src={kaboomLogo}
                    alt="kaboom logo" />
                <div className={classes['child-div']}>
                    {!didSubmitPin ? (<>
                        <input type="text"
                            value={pin}
                            placeholder='הכנס קוד'
                            onChange={handlePinChange}
                            className={classes['pin-input']} />
                        <button className={classes['join-button']} onClick={() => { setDidSubmitPin(true); }}>כנס</button>
                    </>) : (<>
                        <input type="text"
                            value={nickname}
                            placeholder='כתוב שם'
                            onChange={handleNicknameChange}
                            className={classes['pin-input']} />
                        <button className={classes['join-button']} onClick={joinGame}>אחלה, מתחברים!</button>
                    </>)
                    }
                </div>
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
