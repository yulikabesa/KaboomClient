import classes from './AnswerOptions.module.css';
import Diamond from '../../components/shapes/Diamond';
import Triangle from '../../components/shapes/Triangle';
import Square from '../../components/shapes/Square';
import Circle from '../../components/shapes/Circle';
import PlayerCard from '../../components/player/playerCard';

const AnswerOptions = () => {
    const answersCount = 4; // to change to receive from server later
    const options = [
        { color: "#1368CE", shape: <Diamond />, colorOnHover: "#0057BA" },
        { color: "#E21B3C", shape: <Triangle />, colorOnHover: "#CB002C" },
        { color: "#26890C", shape: <Square />, colorOnHover: "#007600" },
        { color: "#D89E00", shape: <Circle />, colorOnHover: "#C28B00" },
        { color: "#0AA3A3", shape: <Diamond />, colorOnHover: "#099494ff" },
        { color: "#864CBF", shape: <Diamond />, colorOnHover: "#7845acff" }
    ];
    return (
        <>
            <div className={classes["container"]}>
                {Array.from({ length: answersCount }).map((_, i) => (
                    <div
                        key={i}
                        className={classes["answer-option"]}
                        style={
                            {
                                "--bg-color": options[i].color,
                                "--hover-color": options[i].colorOnHover
                            } as React.CSSProperties
                        }
                    >
                        {options[i].shape}
                    </div>
                ))}
            </div>
            <PlayerCard name='יעל' points='777' />
        </>
    )
}

export default AnswerOptions;