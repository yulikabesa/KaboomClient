import PlayerCard from '../../components/player/playerCard';
import AnswerOptions from '../../components/player/AnswerOptions';

const PlayerGamePage = () => {
    return (
        <>
            <AnswerOptions answersCount={4} /> // to change number to receive from server later
            <PlayerCard name='יעל' points='777' />
        </>
    )
}

export default PlayerGamePage;