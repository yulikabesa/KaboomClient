import { useState } from 'react';
import classes from './GameLobby.module.css';
import kaboomLogo from '../assets/kaboomLogo.png';
import personIcon from '../assets/personIcon.png';
import rightWhiteTextBackground from '../assets/rightWhiteTextBackground.png';
import leftWhiteTextBackground from '../assets/leftWhiteTextBackground.png';

const GameLobby: React.FC<{ pin: string; }> = (props) => {
    // todo delete players example
    // todo connect socket to receive players nicknames
    const [players, setPlayers] = useState<string[]>([
        "שועל ערמומי",
        "טיגריס פראי",
        "הציפןר האדומה",
        "חיה מסתורית",
        "הנמר המפחיד",
        "העורב החכם",
        "הזאב הלבן",
        "כוחו של הסנאי"
    ]);
    return (
        <div className={classes['page']}>
            <div className={classes['top-info']}>
                <div className={classes['right-rectangle']}>
                    <img src={rightWhiteTextBackground} className={classes['image-container']} alt="kaboom logo" />
                    <div className={classes['pin-text-overlay']}>
                        <p className={classes['pin-text']}>קוד משחק:</p>
                        <p className={classes['pin']}>{props.pin.slice(0, 3)} {props.pin.slice(3)}</p>
                    </div>
                </div>
                <div className={classes['left-rectangle']}>
                    <img src={leftWhiteTextBackground} className={classes['image-container']} alt="kaboom logo" />
                    <div className={classes['text-overlay']}>
                        חפשו{" "}
                        <span className={classes['bold']}>KABOOM</span>
                        {" "}או<br /> כנסו מה -{" "}
                        <span className={classes['bold']}>MOOC</span>
                    </div>
                </div>
            </div>

            <div className={classes['buttons-box']}>
                <div className={classes['start-button']}>התחל</div>
                <div className={classes['player-number-box']}>
                    {players.length.toString()}
                    <img src={personIcon} alt="kaboom logo" />
                </div>
                <img className={classes['kaboom-logo']} src={kaboomLogo} alt="kaboom logo" />
            </div>

            <div className={classes['player-name-box']}>
                {players.map((player) => (
                    <div className={classes['names']} key={player}>
                        {player}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameLobby;