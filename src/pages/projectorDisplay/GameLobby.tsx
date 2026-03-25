import classes from './GameLobby.module.css';
import kaboomLogo from '../../assets/kaboomLogo.png';
import personIcon from '../../assets/personIcon.png';
import rightWhiteTextBackground from '../../assets/rightWhiteTextBackground.png';
import leftWhiteTextBackground from '../../assets/leftWhiteTextBackground.png';
import { useLobby } from '../../store/LobbyContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSocket } from '../../store/SocketContext';

const GameLobby: React.FC = () => {
    const socket = useSocket();
    const { lobby, addPlayer } = useLobby();
    const navigate = useNavigate();
    // making sure u can go to this page only if 
    // if you clicked on create game session from one of your quizes and received game pin
    if (!lobby) {
        return <Navigate to="/home" replace />;
    }

    useEffect(() => {
        if (!socket) return; // Guard against null
        const handlePlayerJoined = (player: { id: string; nickname: string }) => {
            addPlayer(player.nickname); // or player.id if you prefer
        };

        socket.on("player-joined", handlePlayerJoined);

        return () => {
            socket.off("player-joined", handlePlayerJoined);
        };
    }, [addPlayer]);

    const startGame = () => {
        if (!socket || !lobby) return;
        socket.once("game-state", (
            state: {
                phase: string;
                data: any;
            }) => {
            if (state.phase === "question") {
                navigate("/hostGame", {
                    replace: true,
                    state: { questionData: state.data }
                });
            }
        });
        socket.emit("game-event", {
            type: "start-game",
            payload: {
                pin: lobby.gamePin,
            },
        });
    };

    return (
        <div className={classes['page']}>
            <div className={classes['top-info']}>
                <div className={classes['right-rectangle']}>
                    <img src={rightWhiteTextBackground} className={classes['image-container']} alt="kaboom logo" />
                    <div className={classes['pin-text-overlay']}>
                        <p className={classes['pin-text']}>קוד משחק:</p>
                        <p className={classes['pin']}>{lobby.gamePin.slice(0, 3)} {lobby.gamePin.slice(3)}</p>
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
                <div onClick={startGame} className={classes['start-button']}>התחל</div>
                <div className={classes['player-number-box']}>
                    {lobby.players.length.toString()}
                    <img src={personIcon} alt="kaboom logo" />
                </div>
                <img className={classes['kaboom-logo']} src={kaboomLogo} alt="kaboom logo" />
            </div>

            <div className={classes['player-name-box']}>
                {lobby.players.map((player) => (
                    <div className={classes['names']} key={player}>
                        {player}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GameLobby;